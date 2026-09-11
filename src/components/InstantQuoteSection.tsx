"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AnimatePresence, animate, motion } from "framer-motion";
import { PackageSearch, Phone } from "lucide-react";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";

type Coords = { lat: number; lng: number; label: string };

type QuoteResult = {
  ok: boolean;
  oversized?: boolean;
  error?: string;
  quoteRequestId?: string;
  truckType?: { name: string };
  distanceMiles?: number;
  durationMinutes?: number;
  price?: number;
  pickupCoords?: Coords;
  deliveryCoords?: Coords;
};

const MAX_WEIGHT_LBS = 45000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PRIVACY_POLICY_HREF = "/privacy-policy";

function toPickupIso(date: string, time: string) {
  if (!date || !time) return null;
  const value = new Date(`${date}T${time}`);
  return Number.isNaN(value.getTime()) ? null : value.toISOString();
}

const phoneDigitCount = (value: string) => value.replace(/\D/g, "").length;

type RequiredFieldKey =
  | "fullName"
  | "email"
  | "phone"
  | "pickupAddress"
  | "deliveryAddress"
  | "pickupDate"
  | "pickupTime"
  | "weight"
  | "lengthIn"
  | "widthIn"
  | "heightIn"
  | "pieces";

type FormErrors = Partial<Record<RequiredFieldKey, string>>;

type QuoteFormValues = {
  fullName: string;
  email: string;
  phone: string;
  pickupAddress: string;
  deliveryAddress: string;
  pickupDate: string;
  pickupTime: string;
  weightLbs: number;
  lengthIn: string;
  widthIn: string;
  heightIn: string;
  pieces: string;
};

// Client-side validation — mirrors the Zod rules on /api/quote-calculator and
// /api/checkout so the user can't reach authorization/payment with missing or
// invalid data even if browser validation is bypassed.
function validateQuoteForm(values: QuoteFormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.fullName.trim().length < 2) errors.fullName = "Enter your full name.";
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (phoneDigitCount(values.phone) < 7) errors.phone = "Enter a valid phone number.";
  if (values.pickupAddress.trim().length < 3) errors.pickupAddress = "Enter the pickup address.";
  if (values.deliveryAddress.trim().length < 3) errors.deliveryAddress = "Enter the delivery address.";

  if (!values.pickupDate) {
    errors.pickupDate = "Select a pickup date.";
  }
  if (!values.pickupTime) {
    errors.pickupTime = "Select a pickup time.";
  } else if (values.pickupDate) {
    const iso = toPickupIso(values.pickupDate, values.pickupTime);
    if (!iso || new Date(iso).getTime() <= Date.now()) {
      errors.pickupTime = "Pickup date and time must be in the future.";
    }
  }

  if (!Number.isFinite(values.weightLbs) || values.weightLbs <= 0) {
    errors.weight = "Weight must be greater than 0 lbs.";
  } else if (values.weightLbs > MAX_WEIGHT_LBS) {
    errors.weight = `Weight must be ${MAX_WEIGHT_LBS.toLocaleString()} lbs or less.`;
  }

  (["lengthIn", "widthIn", "heightIn"] as const).forEach((key) => {
    const label = key === "lengthIn" ? "length" : key === "widthIn" ? "width" : "height";
    const n = Number(values[key]);
    if (values[key].trim() === "" || Number.isNaN(n) || n <= 0) {
      errors[key] = `Enter a valid ${label}.`;
    }
  });

  const piecesNum = Number(values.pieces);
  if (values.pieces.trim() === "" || !Number.isInteger(piecesNum) || piecesNum < 1) {
    errors.pieces = "Pieces must be a whole number of at least 1.";
  }

  return errors;
}


export function InstantQuoteSection() {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [pickupTimeZone, setPickupTimeZone] = useState("UTC");
  const [minimumPickupDate, setMinimumPickupDate] = useState("");
  const [pieces, setPieces] = useState("1");
  const [pallets, setPallets] = useState("0");
  const [weightLbs, setWeightLbs] = useState(0);
  const [lengthIn, setLengthIn] = useState("");
  const [widthIn, setWidthIn] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [hazmat, setHazmat] = useState(false);
  const [liftgate, setLiftgate] = useState(false);
  const [residentialDelivery, setResidentialDelivery] = useState(false);
  const [insideService, setInsideService] = useState(false);
  const [truckTypeId, setTruckTypeId] = useState("");
  const [shipmentDetails, setShipmentDetails] = useState("");
  // Consent is given by clicking "Confirm Order — Pay Now" (the copy next to
  // the button states the agreement) rather than a separate checkbox.
  const termsAccepted = true;
  const [availableTrucks, setAvailableTrucks] = useState<{id: string, name: string}[]>([]);
  const [touched, setTouched] = useState<Partial<Record<RequiredFieldKey, boolean>>>({});
  const markTouched = (key: RequiredFieldKey) => setTouched((current) => ({ ...current, [key]: true }));

  useEffect(() => {
    fetch("/api/truck-types")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setAvailableTrucks(data.truckTypes);
        }
      })
      .catch(() => {});
  }, []);

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<QuoteResult | null>(null);
  const [checkingOut, setCheckingOut] = useState(false);
  const [paymentBanner, setPaymentBanner] = useState<"cancelled" | null>(null);

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    setMinimumPickupDate(`${year}-${month}-${day}`);
    setPickupTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC");
  }, []);

  // Every field starts empty — we do not pre-populate name/email from the
  // session or any other source. The customer enters their own details.

  const requestSeq = useRef(0);
  // Caches resolved geocode results by the exact address text that produced
  // them, so re-submitting after only a quantity/dimension change can skip
  // the two geocoding calls — the slowest part of each round trip.
  const geocodeCacheRef = useRef<Map<string, Coords>>(new Map());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get("payment");
    if (payment === "cancelled") {
      setPaymentBanner(payment);
      params.delete("payment");
      const newSearch = params.toString();
      window.history.replaceState({}, "", `${window.location.pathname}${newSearch ? `?${newSearch}` : ""}#instant-quote`);
    }
  }, []);

  const fieldErrors = useMemo(
    () =>
      validateQuoteForm({
        fullName: customerName,
        email: customerEmail,
        phone: customerPhone,
        pickupAddress,
        deliveryAddress,
        pickupDate,
        pickupTime,
        weightLbs,
        lengthIn,
        widthIn,
        heightIn,
        pieces,
      }),
    [
      customerName,
      customerEmail,
      customerPhone,
      pickupAddress,
      deliveryAddress,
      pickupDate,
      pickupTime,
      weightLbs,
      lengthIn,
      widthIn,
      heightIn,
      pieces,
    ]
  );

  const isFormValid = Object.keys(fieldErrors).length === 0;
  // Only surface an error once the user has left that field.
  const errorFor = (key: RequiredFieldKey) => (touched[key] ? fieldErrors[key] : undefined);
  const showAllErrors = () =>
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      pickupAddress: true,
      deliveryAddress: true,
      pickupDate: true,
      pickupTime: true,
      weight: true,
      lengthIn: true,
      widthIn: true,
      heightIn: true,
      pieces: true,
    });

  // Auto-calculates once every required field is valid, instead of a manual
  // submit button — debounced so we don't fire a geocode/route request on
  // every keystroke. `isFormValid` guarantees name/email/phone are collected
  // and valid before a quote (and therefore authorization) is ever possible.
  useEffect(() => {
    const pickupAt = toPickupIso(pickupDate, pickupTime);
    if (!isFormValid || !pickupAt || shipmentDetails.trim().length > 2000) {
      setResult(null);
      return;
    }

    const seq = ++requestSeq.current;
    const timer = setTimeout(async () => {
      setSubmitting(true);
      setPaymentBanner(null);

      const cachedPickup = geocodeCacheRef.current.get(pickupAddress);
      const cachedDelivery = geocodeCacheRef.current.get(deliveryAddress);

      try {
        const response = await fetch("/api/quote-calculator", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerName,
            customerEmail,
            customerPhone,
            pickupAt,
            pickupTimeZone,
            shipmentDetails,
            pickupAddress,
            deliveryAddress,
            pickupCoords: cachedPickup,
            deliveryCoords: cachedDelivery,
            pieces: Number(pieces),
            pallets: Number(pallets) || 0,
            weightLbs,
            lengthIn: Number(lengthIn),
            widthIn: Number(widthIn),
            heightIn: Number(heightIn),
            hazmat,
            truckTypeId: truckTypeId || undefined,
            // Accessorials — sent now so they flow through as soon as the
            // backend persists them. /api/quote-calculator currently strips
            // unknown keys, so these are a no-op until the schema is extended.
            liftgate,
            residentialDelivery,
            insideService,
          }),
        });

        const data: QuoteResult = await response.json();

        if (!response.ok || !data.ok) {
          // Surface the API's own message (it's specific and useful) but also
          // log the raw failure so it isn't lost.
          console.error("Quote calculation returned an error", {
            status: response.status,
            body: data,
          });
        }

        if (seq === requestSeq.current) setResult(data);

        if (data.ok && !data.oversized) {
          if (data.pickupCoords) geocodeCacheRef.current.set(pickupAddress, data.pickupCoords);
          if (data.deliveryCoords) geocodeCacheRef.current.set(deliveryAddress, data.deliveryCoords);
        }
      } catch (error) {
        console.error("Quote calculation request failed", error);
        if (seq === requestSeq.current) {
          setResult({
            ok: false,
            error: "Unable to calculate your quote. Please check your shipment details and try again.",
          });
        }
      } finally {
        if (seq === requestSeq.current) setSubmitting(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [
    isFormValid,
    customerName,
    customerEmail,
    customerPhone,
    pickupAddress,
    deliveryAddress,
    pickupDate,
    pickupTime,
    pickupTimeZone,
    pieces,
    pallets,
    weightLbs,
    lengthIn,
    widthIn,
    heightIn,
    hazmat,
    truckTypeId,
    shipmentDetails,
    liftgate,
    residentialDelivery,
    insideService,
  ]);

  const handleCheckout = async (quoteRequestId: string) => {
    // Authorization guard — customer contact + shipment data must be valid
    // before we ever start payment, even if the quote card is somehow shown.
    if (!isFormValid) {
      showAllErrors();
      setResult((prev) =>
        prev ? { ...prev, error: "Please complete the required fields before continuing." } : prev
      );
      return;
    }

    const role = (session?.user as { role?: string } | undefined)?.role;
    if (role !== "customer") {
      router.push(`/login?next=${encodeURIComponent(quoteRequestId)}&termsAccepted=${termsAccepted}`);
      return;
    }

    setCheckingOut(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quoteRequestId, termsAccepted }),
      });
      const data: { ok: boolean; url?: string; error?: string } = await response.json();
      if (data.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setResult((prev) => (prev ? { ...prev, error: data.error ?? "Unable to start checkout." } : prev));
    } catch {
      setResult((prev) => (prev ? { ...prev, error: "Unable to start checkout. Please try again." } : prev));
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <section id="instant-quote" className="iq-section">
      <svg width="0" height="0" style={{ position: "absolute", overflow: "hidden" }}>
        <defs>
          <clipPath id="quote-card-clip" clipPathUnits="objectBoundingBox">
            <path d="
              M 0.025,0 L 0.545,0 Q 0.57,0 0.5877,0.0177 L 0.6023,0.0323
              Q 0.62,0.05 0.645,0.05 L 0.975,0.05 Q 1.0,0.05 1.0,0.075
              L 1.0,0.975 Q 1.0,1.0 0.975,1.0 L 0.025,1.0 Q 0,1.0 0,0.975
              L 0,0.675 Q 0,0.65 0.0177,0.6323 L 0.0323,0.6177
              Q 0.05,0.60 0.05,0.575 L 0.05,0.245 Q 0.05,0.22 0.0305,0.2044
              L 0.0195,0.1956 Q 0,0.18 0,0.155 L 0,0.025 Q 0,0 0.025,0 Z
            " />
          </clipPath>
        </defs>
      </svg>

      <motion.div
        className="iq-head"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="iq-kicker-row">
          <span className="iq-kicker-line" />
          Instant Quote
          <span className="iq-kicker-line" />
        </span>
      </motion.div>

      <div className="iq-layout">
        <motion.div
          className="iq-form-col"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="iq-form-title">Get a Shipping Quote</h3>

          <form className="iq-form" noValidate onSubmit={(event) => event.preventDefault()}>
            <fieldset className="iq-fieldset">
              <legend className="iq-section-label">Customer Information</legend>
              <div className="iq-row iq-row-3">
                <TextInput
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  value={customerName}
                  onChange={setCustomerName}
                  onBlur={() => markTouched("fullName")}
                  autoComplete="name"
                  required
                  error={errorFor("fullName")}
                />
                <TextInput
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  value={customerEmail}
                  onChange={setCustomerEmail}
                  onBlur={() => markTouched("email")}
                  autoComplete="email"
                  required
                  error={errorFor("email")}
                />
                <TextInput
                  id="phone"
                  name="phone"
                  label="Phone Number"
                  type="tel"
                  value={customerPhone}
                  onChange={setCustomerPhone}
                  onBlur={() => markTouched("phone")}
                  autoComplete="tel"
                  required
                  error={errorFor("phone")}
                />
              </div>
            </fieldset>

            <fieldset className="iq-fieldset">
              <legend className="iq-section-label">Pickup &amp; Delivery</legend>
              <div className="iq-row iq-row-2">
                <AddressAutocomplete
                  id="pickupAddress"
                  name="pickupAddress"
                  label="Pickup Address"
                  placeholder="City, state or full address"
                  value={pickupAddress}
                  onChange={setPickupAddress}
                  onBlur={() => markTouched("pickupAddress")}
                  required
                  error={errorFor("pickupAddress")}
                />
                <AddressAutocomplete
                  id="deliveryAddress"
                  name="deliveryAddress"
                  label="Delivery Address"
                  placeholder="City, state or full address"
                  value={deliveryAddress}
                  onChange={setDeliveryAddress}
                  onBlur={() => markTouched("deliveryAddress")}
                  required
                  error={errorFor("deliveryAddress")}
                />
              </div>
              <div className="iq-row iq-row-2">
                <TextInput
                  id="pickupDate"
                  name="pickupDate"
                  label="Pickup Date"
                  type="date"
                  value={pickupDate}
                  onChange={setPickupDate}
                  onBlur={() => markTouched("pickupDate")}
                  min={minimumPickupDate}
                  required
                  error={errorFor("pickupDate")}
                />
                <TextInput
                  id="pickupTime"
                  name="pickupTime"
                  label="Pickup Time"
                  type="time"
                  value={pickupTime}
                  onChange={setPickupTime}
                  onBlur={() => markTouched("pickupTime")}
                  required
                  error={errorFor("pickupTime")}
                />
              </div>
            </fieldset>

            <fieldset className="iq-fieldset">
              <legend className="iq-section-label">Shipment Details</legend>
              <div className="iq-row iq-row-4">
                <SelectField
                  id="truckType"
                  name="truckType"
                  label="Truck Type"
                  value={truckTypeId}
                  onChange={setTruckTypeId}
                  options={availableTrucks}
                  placeholderOption="Auto (based on weight & size)"
                />
                <TextInput
                  id="pieces"
                  name="pieces"
                  label="Pieces"
                  type="number"
                  value={pieces}
                  onChange={setPieces}
                  onBlur={() => markTouched("pieces")}
                  min="1"
                  step="1"
                  inputMode="numeric"
                  error={errorFor("pieces")}
                />
                <TextInput
                  id="pallets"
                  name="pallets"
                  label="Pallets"
                  type="number"
                  value={pallets}
                  onChange={setPallets}
                  min="0"
                  step="1"
                  inputMode="numeric"
                />
                <div className="iq-hazmat-wrap">
                  <CheckboxField
                    id="hazmat"
                    name="hazmat"
                    label="Hazmat"
                    checked={hazmat}
                    onChange={setHazmat}
                  />
                </div>
              </div>
            </fieldset>

            <fieldset className="iq-fieldset">
              <legend className="iq-section-label">Dimensions</legend>
              <div className="iq-row iq-row-3">
                <TextInput
                  id="lengthIn"
                  name="lengthIn"
                  label="Length (in)"
                  type="number"
                  value={lengthIn}
                  onChange={setLengthIn}
                  onBlur={() => markTouched("lengthIn")}
                  min="1"
                  step="1"
                  inputMode="numeric"
                  required
                  error={errorFor("lengthIn")}
                />
                <TextInput
                  id="widthIn"
                  name="widthIn"
                  label="Width (in)"
                  type="number"
                  value={widthIn}
                  onChange={setWidthIn}
                  onBlur={() => markTouched("widthIn")}
                  min="1"
                  step="1"
                  inputMode="numeric"
                  required
                  error={errorFor("widthIn")}
                />
                <TextInput
                  id="heightIn"
                  name="heightIn"
                  label="Height (in)"
                  type="number"
                  value={heightIn}
                  onChange={setHeightIn}
                  onBlur={() => markTouched("heightIn")}
                  min="1"
                  step="1"
                  inputMode="numeric"
                  required
                  error={errorFor("heightIn")}
                />
              </div>
            </fieldset>

            <fieldset className="iq-fieldset">
              <legend className="iq-section-label">Weight</legend>
              <div className="iq-row iq-row-1">
                <SliderField
                  id="weight"
                  name="weight"
                  label="Weight (lbs)"
                  hideLabel
                  unit="lbs"
                  min={0}
                  max={MAX_WEIGHT_LBS}
                  step={50}
                  value={weightLbs}
                  onChange={setWeightLbs}
                  onBlur={() => markTouched("weight")}
                  required
                  error={errorFor("weight")}
                />
              </div>
            </fieldset>

            <fieldset className="iq-fieldset">
              <legend className="iq-section-label">Additional Services</legend>
              <div className="iq-row iq-row-4">
                <CheckboxField
                  id="liftgate"
                  name="liftgate"
                  label="Liftgate"
                  checked={liftgate}
                  onChange={setLiftgate}
                />
                <CheckboxField
                  id="residentialDelivery"
                  name="residentialDelivery"
                  label="Residential Delivery"
                  checked={residentialDelivery}
                  onChange={setResidentialDelivery}
                />
                <CheckboxField
                  id="insideService"
                  name="insideService"
                  label="Inside Service"
                  checked={insideService}
                  onChange={setInsideService}
                />
              </div>
            </fieldset>

            <div className="iq-row iq-row-1">
              <TextAreaField
                id="shipmentDetails"
                name="shipmentDetails"
                label="Shipment Details / Special Instructions"
                value={shipmentDetails}
                onChange={setShipmentDetails}
                maxLength={2000}
              />
            </div>

            <p className="iq-form-privacy">
              Your information is used to provide your shipping quote, process your booking, and
              contact you about your shipment. We do not use your information for unrelated purposes.{" "}
              <Link href={PRIVACY_POLICY_HREF}>View our Privacy Policy</Link>.
            </p>
          </form>
        </motion.div>

        <motion.div
          className="iq-results-panel"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ clipPath: "url(#quote-card-clip)" }}
        >
          <div className="iq-results-glow" />

          {paymentBanner ? (
            <div className="iq-payment-banner iq-payment-banner--cancelled">
              Checkout was cancelled. Your quote is still saved below if you&apos;d like to try again.
            </div>
          ) : null}

          <div className="iq-results-head">
            <h3 className="iq-results-title">Your Quote</h3>
            <AnimatePresence mode="wait">
              {result?.ok && !result.oversized ? (
                <motion.p
                  key="price"
                  className="iq-results-price"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                >
                  $<AnimatedNumber value={result.price ?? 0} />
                </motion.p>
              ) : (
                <p key="placeholder" className="iq-results-price iq-results-price--muted">$—</p>
              )}
            </AnimatePresence>
          </div>

          <div className="iq-divider">
            <span className="iq-divider-dot" />
          </div>

          <div className="iq-results-body">
            <AnimatePresence mode="wait">
              {result ? (
                <ResultPanel
                  key={JSON.stringify(result)}
                  result={result}
                  checkingOut={checkingOut}
                  recalculating={submitting}
                  onCheckout={handleCheckout}
                />
              ) : (
                <EmptyResults key="empty" submitting={submitting} />
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <style>{`
        .iq-section {
          position: relative;
          display: flex;
          flex-direction: column;
          background:
            radial-gradient(circle at 8% 8%, rgba(227, 30, 36, 0.07), transparent 23rem),
            linear-gradient(180deg, #f8faf8 0%, #f1f4f1 100%);
          padding: 6.5rem var(--grid-margin) 7rem;
          overflow: hidden;
          scroll-margin-top: 110px;
        }

        .iq-section::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.38;
          background-image:
            linear-gradient(rgba(5, 36, 36, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(5, 36, 36, 0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: linear-gradient(to bottom, black, transparent 65%);
        }

        .iq-head {
          position: relative;
          z-index: 1;
          text-align: center;
          margin-bottom: 2rem;
        }

        .iq-kicker-row {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #7a9900;
        }

        .iq-kicker-line {
          width: 28px;
          height: 1px;
          background: #7a9900;
        }

        .iq-layout {
          position: relative;
          z-index: 1;
          width: min(100%, 1480px);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1.28fr) minmax(370px, 0.72fr);
          gap: 1.5rem;
          align-items: start;
        }

        .iq-form-col {
          min-width: 0;
        }

        .iq-form-shell {
          overflow: hidden;
          border: 1px solid rgba(5, 36, 36, 0.09);
          border-radius: 28px 28px 28px 8px;
          background: rgba(255, 255, 255, 0.94);
          box-shadow: 0 24px 70px rgba(5, 36, 36, 0.09);
          backdrop-filter: blur(10px);
        }

        .iq-form-intro {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 2rem;
          padding: 2rem 2.25rem 1.75rem;
          border-bottom: 1px solid rgba(5, 36, 36, 0.08);
          background: linear-gradient(120deg, rgba(237, 241, 237, 0.75), rgba(255, 255, 255, 0.96));
        }

        .iq-form-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.85rem;
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #617900;
        }

        .iq-live-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #91b500;
          box-shadow: 0 0 0 4px rgba(145, 181, 0, 0.14);
        }

        .iq-form-title {
          margin: 0;
          font-family: var(--font-primary);
          font-size: clamp(1.75rem, 2.4vw, 2.35rem);
          font-weight: 560;
          letter-spacing: -0.045em;
          line-height: 1.04;
          color: var(--c-dark-green);
        }

        .iq-form-copy {
          max-width: 55ch;
          margin: 0.65rem 0 0;
          font-family: var(--font-primary);
          font-size: 0.9rem;
          line-height: 1.55;
          color: rgba(5, 36, 36, 0.58);
        }

        .iq-step-count {
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          padding-left: 1.5rem;
          border-left: 1px solid rgba(5, 36, 36, 0.12);
        }

        .iq-step-count strong {
          font-family: var(--font-mono);
          font-size: 1.75rem;
          line-height: 1;
          color: #E31E24;
        }

        .iq-step-count span {
          margin-top: 0.3rem;
          font-family: var(--font-mono);
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(5, 36, 36, 0.45);
        }

        .iq-wizard-nav {
          position: relative;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0.55rem;
          padding: 1rem 2.25rem;
          border-bottom: 1px solid rgba(5, 36, 36, 0.08);
          background: #fff;
        }

        .iq-wizard-nav::before {
          content: "";
          position: absolute;
          left: 2.25rem;
          right: 2.25rem;
          top: 50%;
          height: 1px;
          background: rgba(5, 36, 36, 0.08);
        }

        .iq-wizard-tab {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          min-width: 0;
          padding: 0.55rem 0.7rem;
          border: 1px solid rgba(5, 36, 36, 0.09);
          border-radius: 12px;
          background: #fff;
          color: rgba(5, 36, 36, 0.48);
          cursor: pointer;
          transition: border-color 0.18s ease, color 0.18s ease, background 0.18s ease, transform 0.18s ease;
        }

        .iq-wizard-tab:hover {
          color: var(--c-dark-green);
          border-color: rgba(5, 36, 36, 0.2);
          transform: translateY(-1px);
        }

        .iq-wizard-tab > span {
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: #eef2ee;
          font-family: var(--font-mono);
          font-size: 0.58rem;
          font-weight: 800;
        }

        .iq-wizard-tab strong {
          overflow: hidden;
          font-family: var(--font-primary);
          font-size: 0.73rem;
          font-weight: 700;
          text-overflow: ellipsis;
        }

        .iq-wizard-tab.is-active {
          border-color: #E31E24;
          background: #fff6f6;
          color: var(--c-dark-green);
          box-shadow: 0 8px 22px rgba(227, 30, 36, 0.08);
        }

        .iq-wizard-tab.is-active > span {
          background: #E31E24;
          color: #fff;
        }

        .iq-wizard-tab.is-complete > span {
          background: var(--c-dark-green);
          color: #fff;
        }

        .iq-results-panel {
          position: sticky;
          overflow: hidden;
          top: 120px;
          min-height: 610px;
          display: flex;
          flex-direction: column;
          padding: 1.4rem 1.65rem 1.75rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 28px 28px 8px 28px;
          color: #fff;
          background: linear-gradient(155deg, #111c2e 0%, #0a1423 58%, #111521 100%);
          box-shadow: 0 32px 80px rgba(7, 18, 33, 0.25);
        }

        .iq-results-panel::before {
          content: "EST // 24-7";
          position: absolute;
          right: 1.7rem;
          bottom: 1.25rem;
          z-index: 0;
          font-family: var(--font-mono);
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: rgba(255, 255, 255, 0.16);
        }

        .iq-results-body {
          position: relative;
          z-index: 1;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .iq-results-glow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 65% 48% at 100% 0%, rgba(227, 30, 36, 0.35), transparent 66%),
            radial-gradient(circle at 4% 100%, rgba(145, 181, 0, 0.1), transparent 34%);
          pointer-events: none;
        }

        .iq-results-grid {
          position: absolute;
          inset: 0;
          opacity: 0.12;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: linear-gradient(155deg, transparent 8%, black 72%, transparent 100%);
        }

        .iq-results-status {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 2.3rem;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.62);
        }

        .iq-results-status > span {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
        }

        .iq-results-status .iq-live-dot {
          width: 6px;
          height: 6px;
          box-shadow: 0 0 0 4px rgba(145, 181, 0, 0.12);
        }

        .iq-results-head {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
        }

        .iq-results-overline {
          display: block;
          margin-bottom: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.38);
        }

        .iq-results-title {
          margin: 0;
          font-family: var(--font-primary);
          font-size: 1.35rem;
          font-weight: 560;
          letter-spacing: -0.035em;
          color: #fff;
        }

        .iq-results-price {
          margin: 0;
          font-family: var(--font-primary);
          font-size: clamp(2rem, 3vw, 2.65rem);
          font-weight: 600;
          letter-spacing: -0.055em;
          color: #fff;
          text-align: right;
        }

        .iq-results-price--muted {
          color: rgba(255, 255, 255, 0.25);
        }

        .iq-divider {
          position: relative;
          height: 1px;
          margin: 1.4rem 0;
          background: linear-gradient(90deg, rgba(227, 30, 36, 0.55), rgba(255, 255, 255, 0.08));
        }

        .iq-divider-dot {
          position: absolute;
          top: 0;
          left: 0;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #5fbf5f;
          box-shadow: 0 0 4px 1px rgba(95, 191, 95, 0.6);
          transform: translateY(-50%);
          animation: iq-dot-run 3.6s ease-in-out infinite;
        }

        @keyframes iq-dot-run {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }

        .iq-payment-banner {
          position: relative;
          margin-bottom: 1.25rem;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          font-family: var(--font-primary);
          font-size: 0.8125rem;
          line-height: 1.5;
        }


        .iq-payment-banner--cancelled {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: rgba(255, 255, 255, 0.75);
        }

        .iq-form {
          display: flex;
          flex-direction: column;
          min-height: 370px;
          padding: 0 2.25rem;
        }

        .iq-form-group {
          display: grid;
          grid-template-columns: minmax(175px, 0.36fr) minmax(0, 1fr);
          gap: 1.75rem;
          padding: 2.15rem 0 2rem;
        }

        .iq-form-group[hidden] {
          display: none;
        }

        .iq-group-head {
          position: relative;
          align-self: start;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: start;
          gap: 0.75rem;
        }

        .iq-group-head > svg {
          margin-top: 0.15rem;
          color: rgba(5, 36, 36, 0.28);
        }

        .iq-group-number {
          display: grid;
          place-items: center;
          width: 31px;
          height: 31px;
          border-radius: 10px 10px 3px 10px;
          background: var(--c-dark-green);
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: #fff;
        }

        .iq-group-head h4 {
          margin: 0;
          font-family: var(--font-primary);
          font-size: 0.92rem;
          font-weight: 750;
          color: var(--c-dark-green);
        }

        .iq-group-head p {
          margin: 0.28rem 0 0;
          font-family: var(--font-primary);
          font-size: 0.72rem;
          line-height: 1.45;
          color: rgba(5, 36, 36, 0.47);
        }

        .iq-group-fields {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .iq-review-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.65rem;
        }

        .iq-review-grid button {
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.35rem;
          padding: 0.8rem;
          border: 1px solid rgba(5, 36, 36, 0.1);
          border-radius: 12px;
          background: #f7f9f7;
          text-align: left;
          cursor: pointer;
          transition: border-color 0.15s ease, background 0.15s ease;
        }

        .iq-review-grid button:hover {
          border-color: rgba(227, 30, 36, 0.45);
          background: #fff;
        }

        .iq-review-grid span {
          font-family: var(--font-mono);
          font-size: 0.55rem;
          font-weight: 750;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(5, 36, 36, 0.42);
        }

        .iq-review-grid strong {
          width: 100%;
          overflow: hidden;
          font-family: var(--font-primary);
          font-size: 0.75rem;
          color: var(--c-dark-green);
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .iq-wizard-actions {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 1rem;
          margin-top: auto;
          padding: 1.1rem 0 1.35rem;
          border-top: 1px solid rgba(5, 36, 36, 0.08);
        }

        .iq-wizard-actions > span {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(5, 36, 36, 0.42);
        }

        .iq-wizard-back,
        .iq-wizard-next {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          min-height: 42px;
          padding: 0.65rem 1rem;
          border-radius: 11px;
          font-family: var(--font-primary);
          font-size: 0.78rem;
          font-weight: 750;
          cursor: pointer;
          transition: transform 0.15s ease, background 0.15s ease;
        }

        .iq-wizard-back {
          justify-self: start;
          border: 1px solid rgba(5, 36, 36, 0.12);
          background: #fff;
          color: var(--c-dark-green);
        }

        .iq-wizard-back:disabled {
          opacity: 0.28;
          cursor: default;
        }

        .iq-wizard-next {
          justify-self: end;
          border: 0;
          background: var(--c-dark-green);
          color: #fff;
          box-shadow: 0 10px 24px rgba(5, 36, 36, 0.16);
        }

        .iq-wizard-next:hover {
          background: #0a3535;
          transform: translateY(-1px);
        }

        .iq-auto-note {
          justify-self: end;
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          text-align: right;
          color: #617900 !important;
        }

        .iq-subhead {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          margin: 0.15rem 0 -0.2rem;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(5, 36, 36, 0.44);
        }

        .iq-row {
          display: grid;
          gap: 0.85rem;
        }

        .iq-row-1 {
          grid-template-columns: 1fr;
        }

        .iq-row-2 {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .iq-row-3 {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .iq-row-4 {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .iq-field {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          min-width: 0;
        }

        .iq-label {
          font-family: var(--font-primary);
          font-size: 0.66rem;
          font-weight: 750;
          letter-spacing: 0.075em;
          text-transform: uppercase;
          color: rgba(5, 36, 36, 0.65);
        }

        .iq-input {
          width: 100%;
          min-height: 46px;
          background: #f7f9f7;
          border: 1px solid rgba(5, 36, 36, 0.11);
          border-radius: 11px;
          padding: 0.72rem 0.85rem;
          color: var(--c-dark-green);
          font-family: var(--font-primary);
          font-size: 0.88rem;
          outline: none;
          transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
        }

        .iq-input:focus {
          background: #fff;
          border-color: rgba(227, 30, 36, 0.58);
          box-shadow: 0 0 0 3px rgba(227, 30, 36, 0.08);
        }

        .iq-input::placeholder {
          color: rgba(5, 36, 36, 0.38);
        }

        .iq-textarea {
          min-height: 6rem;
          resize: vertical;
          line-height: 1.5;
        }

        .iq-field-error {
          margin: -0.35rem 0 0;
          color: #b91c1c;
          font-family: var(--font-primary);
          font-size: 0.8125rem;
          font-weight: 600;
        }

        .iq-suggestions {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          z-index: 20;
          margin-top: 6px;
          border-radius: 14px;
          border: 1px solid var(--c-dark-green-15);
          background: var(--c-white);
          box-shadow: 0 20px 40px rgba(5, 36, 36, 0.12);
          overflow: hidden;
          list-style: none;
          padding: 0;
        }

        .iq-suggestion {
          display: block;
          width: 100%;
          padding: 10px 14px;
          text-align: left;
          font-family: var(--font-primary);
          font-size: 0.875rem;
          color: var(--c-dark-green);
          background: none;
          border: none;
          cursor: pointer;
        }

        .iq-suggestion:hover {
          background: var(--c-dirty-white);
        }

        .iq-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 0.7rem;
          min-height: 330px;
          color: rgba(255, 255, 255, 0.55);
        }

        .iq-empty-route {
          display: flex;
          align-items: center;
          width: min(100%, 260px);
          margin-bottom: 1.25rem;
        }

        .iq-route-pin {
          position: relative;
          z-index: 1;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          width: 34px;
          height: 34px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 10px 10px 3px 10px;
          background: #17253a;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.24);
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 800;
          color: #fff;
        }

        .iq-route-pin--end {
          border-radius: 10px 10px 10px 3px;
          border-color: rgba(227, 30, 36, 0.55);
          background: #E31E24;
        }

        .iq-route-line {
          position: relative;
          flex: 1;
          height: 1px;
          border-top: 1px dashed rgba(255, 255, 255, 0.25);
        }

        .iq-route-line i {
          position: absolute;
          top: -3px;
          left: 15%;
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #91b500;
          box-shadow: 0 0 8px rgba(145, 181, 0, 0.8);
          animation: iq-route-run 2.7s ease-in-out infinite;
        }

        @keyframes iq-route-run {
          0%, 100% { left: 10%; opacity: 0.35; }
          50% { left: 86%; opacity: 1; }
        }

        .iq-empty-icon {
          display: grid;
          place-items: center;
          width: 54px;
          height: 54px;
          margin-top: -2.8rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 18px 18px 6px 18px;
          background: rgba(255, 255, 255, 0.055);
          backdrop-filter: blur(5px);
        }

        .iq-empty-icon svg {
          color: rgba(255, 255, 255, 0.38);
        }

        .iq-empty h4 {
          margin: 0.35rem 0 0;
          font-family: var(--font-primary);
          font-size: 1.12rem;
          font-weight: 650;
          letter-spacing: -0.025em;
          color: #fff;
        }

        .iq-empty p {
          margin: 0;
          max-width: 34ch;
          font-family: var(--font-primary);
          font-size: 0.84rem;
          line-height: 1.6;
        }

        .iq-empty-hints {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.45rem;
          margin-top: 0.75rem;
        }

        .iq-empty-hints span {
          padding: 0.35rem 0.55rem;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.035);
          font-family: var(--font-mono);
          font-size: 0.53rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
        }

        .iq-result-meta {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.55rem;
        }

        .iq-result-meta-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.4rem;
          min-width: 0;
          padding: 0.8rem;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.045);
        }

        .iq-result-meta-item .label {
          font-family: var(--font-primary);
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.55);
        }

        .iq-result-meta-item .value {
          font-family: var(--font-primary);
          font-size: 0.82rem;
          font-weight: 700;
          color: #fff;
          overflow-wrap: anywhere;
        }

        .iq-estimate-disclaimer {
          margin: 1.5rem 0 0;
          padding: 0.85rem 1rem;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          font-family: var(--font-primary);
          font-size: 0.8125rem;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.7);
        }

        .iq-result-warn,
        .iq-result-error {
          font-family: var(--font-primary);
          font-size: 0.9375rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.75);
        }

        .iq-result-warn a,
        .iq-result-error a {
          color: #E31E24;
          font-weight: 700;
          text-decoration: underline;
        }

        .iq-confirm-box {
          margin-top: 1.75rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .iq-confirm-box h4 {
          margin: 0;
          font-family: var(--font-primary);
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
        }

        .iq-confirm-box p {
          margin: 0.4rem 0 1.1rem;
          font-family: var(--font-primary);
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.55);
        }

        .iq-consent-note {
          margin: 0.85rem 0 0 !important;
          font-family: var(--font-primary);
          font-size: 0.7rem !important;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.45) !important;
        }

        .iq-consent-note a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .iq-pay-btn {
          width: 100%;
          padding: 0.9rem 1.5rem;
          background: #E31E24;
          color: #ffffff;
          border: none;
          border-radius: 12px;
          font-family: var(--font-primary);
          font-size: 0.9375rem;
          font-weight: 800;
          letter-spacing: -0.01em;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.15s ease;
        }

        .iq-pay-btn:hover:not(:disabled) {
          background: #C81920;
          transform: translateY(-1px);
        }

        .iq-pay-btn:disabled {
          opacity: 0.6;
          cursor: default;
        }

        @media (max-width: 1100px) {
          .iq-layout {
            grid-template-columns: 1fr;
            max-width: 850px;
          }

          .iq-results-panel {
            position: static;
            min-height: 0;
            border-radius: 28px 28px 8px 28px;
          }
        }

        @media (max-width: 760px) {
          .iq-form-intro {
            padding: 1.65rem;
          }

          .iq-wizard-nav {
            padding-inline: 1.65rem;
          }

          .iq-wizard-nav::before {
            left: 1.65rem;
            right: 1.65rem;
          }

          .iq-form {
            padding: 0 1.65rem 0.25rem;
          }

          .iq-form-group {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }

          .iq-group-head > svg {
            margin-left: auto;
          }
        }

        @media (max-width: 640px) {
          .iq-section {
            padding: 4.5rem 1rem;
          }

          .iq-results-panel {
            padding: 1.2rem 1.2rem 1.6rem;
          }

          .iq-form-shell {
            border-radius: 22px 22px 22px 7px;
          }

          .iq-form-intro {
            padding: 1.4rem;
          }

          .iq-step-count {
            display: none;
          }

          .iq-form {
            padding: 0 1.4rem 0.2rem;
          }

          .iq-wizard-nav {
            gap: 0.4rem;
            padding: 0.8rem 1.4rem;
          }

          .iq-wizard-nav::before {
            left: 1.4rem;
            right: 1.4rem;
          }

          .iq-wizard-tab {
            flex-direction: column;
            gap: 0.3rem;
            padding: 0.45rem 0.25rem;
          }

          .iq-wizard-tab strong {
            font-size: 0.58rem;
          }

          .iq-form-group {
            padding: 1.5rem 0;
          }

          .iq-row-2,
          .iq-row-3 {
            grid-template-columns: 1fr;
          }

          .iq-review-grid {
            grid-template-columns: 1fr;
          }

          .iq-wizard-actions {
            grid-template-columns: 1fr 1fr;
          }

          .iq-wizard-actions > span:not(.iq-auto-note) {
            display: none;
          }

          .iq-results-status {
            margin-bottom: 1.8rem;
          }

          .iq-result-meta {
            grid-template-columns: 1fr;
          }

          .iq-empty {
            min-height: 310px;
          }

          .iq-empty-hints span:last-child {
            display: none;
          }
        }

        /* Original quote layout */
        .iq-section {
          /* Was min-height: 100svh, which forced the whole section to at
             least a full viewport tall regardless of how compact its
             content was — a big part of "takes too much vertical space".
             Content now decides the height. */
          justify-content: center;
          background: var(--c-white);
          padding: 4.5rem var(--grid-margin);
        }

        .iq-section::before {
          display: none;
        }

        .iq-head {
          margin-bottom: 2.75rem;
        }

        .iq-layout {
          width: 100%;
          /* max-width:none cancels a legacy @media(max-width:1100px) rule
             further up that pinned this to 850px and left-aligned it on
             tablet; margin-inline:auto just centres it on very wide screens. */
          max-width: none;
          margin-inline: auto;
          /* 50 / 50 columns that stretch to the same height — the balanced
             "two equal panels" look, matching the form column. */
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 32px;
          align-items: stretch;
        }

        @media (max-width: 1199px) {
          .iq-layout {
            gap: 1.5rem;
          }
        }

        .iq-form-col {
          padding: 1rem 0;
        }

        .iq-form-title {
          margin: 0 0 1.25rem;
          font-size: clamp(1.5rem, 2.4vw, 2rem);
          font-weight: 450;
          letter-spacing: -0.02em;
          line-height: normal;
        }

        .iq-form {
          min-height: 0;
          padding: 0;
          /* Gap between fieldsets = the section-to-section rhythm (~28px). */
          gap: 1.75rem;
        }

        .iq-section-label {
          margin-top: 0.75rem;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(5, 36, 36, 0.45);
        }

        .iq-section-label:first-of-type {
          margin-top: 0;
        }

        .iq-row {
          gap: 1.25rem;
          margin-bottom: 0;
        }

        .iq-field {
          gap: 0.4rem;
        }

        .iq-label {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.06em;
        }

        .iq-input {
          min-height: 0;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--c-dark-green-15);
          border-radius: 0;
          padding: 0.6rem 0;
          font-size: 0.95rem;
          box-shadow: none;
        }

        .iq-input:focus {
          background: transparent;
          border-bottom-color: #E31E24;
          box-shadow: none;
        }

        .iq-textarea {
          min-height: 5.5rem;
        }

        .iq-field-error {
          margin: 0.35rem 0 0;
        }

        /* Keeps the Hazmat checkbox aligned with the bottom of the text
           inputs sharing its row. */
        .iq-hazmat-wrap {
          display: flex;
          align-items: flex-end;
        }

        .iq-slider-field {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        .iq-slider-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1rem;
        }

        .iq-slider-value {
          margin-left: auto;
          font-family: var(--font-primary);
          font-size: 1rem;
          font-weight: 700;
          color: var(--c-dark-green);
          white-space: nowrap;
        }

        .iq-slider-value span {
          margin-left: 0.25rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--c-gray);
        }

        .iq-slider-input {
          width: 100%;
          min-width: 0;
          margin: 0.2rem 0 0;
          appearance: none;
          -webkit-appearance: none;
          height: 4px;
          border-radius: 999px;
          background: rgba(5, 36, 36, 0.15);
          outline: none;
          cursor: pointer;
        }

        .iq-slider-input::-webkit-slider-runnable-track {
          height: 4px;
          border-radius: 999px;
        }

        .iq-slider-input::-moz-range-track {
          height: 4px;
          border-radius: 999px;
          background: rgba(5, 36, 36, 0.15);
        }

        .iq-slider-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          margin-top: -7px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid #E31E24;
          box-shadow: 0 2px 8px rgba(5, 36, 36, 0.25);
          cursor: pointer;
        }

        .iq-slider-input::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid #E31E24;
          box-shadow: 0 2px 8px rgba(5, 36, 36, 0.25);
          cursor: pointer;
        }

        .iq-slider-scale {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-primary);
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--c-gray);
        }

        .iq-results-panel {
          /* height: 100% + align-items: stretch on .iq-layout keeps the card
             level with the form column — the original balanced design.
             The left padding is a % so content always clears the curved left
             indent of the clip-path (which is 5% of the card width). */
          position: relative;
          top: auto;
          height: 100%;
          min-height: 0;
          padding: 2.25rem 2rem 2.25rem max(2.5rem, 6.5%);
          border: 0;
          border-radius: 0;
          background: #0d1728;
          box-shadow: 0 32px 72px rgba(15, 23, 42, 0.24);
        }

        .iq-results-panel::before {
          display: none;
        }

        .iq-results-glow {
          /* Subtle dark purple / maroon haze toward the top-right corner. */
          background:
            radial-gradient(ellipse 70% 58% at 92% 0%, rgba(124, 42, 78, 0.42), transparent 70%),
            radial-gradient(ellipse 55% 45% at 78% 0%, rgba(84, 30, 92, 0.28), transparent 72%);
        }

        .iq-results-title {
          font-size: 1.25rem;
          font-weight: 450;
          letter-spacing: -0.02em;
        }

        .iq-estimate-disclaimer {
          color: #f2c94c;
        }

        /* Push the header (esp. the right-aligned "$ —" / price) below the
           notched top-right edge of the card so it isn't clipped. */
        .iq-results-head {
          padding-top: 2.25rem;
        }

        .iq-results-price {
          margin-top: 0.5rem;
          font-size: clamp(1.75rem, 3vw, 2.25rem);
          font-weight: 450;
          letter-spacing: -0.02em;
        }

        .iq-divider {
          margin: 1.1rem 0;
          background: rgba(227, 30, 36, 0.18);
        }

        .iq-empty {
          gap: 0.75rem;
          min-height: 220px;
        }

        .iq-empty > svg {
          color: rgba(255, 255, 255, 0.25);
        }

        .iq-empty p {
          max-width: 24ch;
          font-size: 0.9375rem;
        }

        .iq-result-meta {
          grid-template-columns: 1fr;
          gap: 0.5rem;
        }

        .iq-result-meta-item {
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.7rem 0.95rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.035);
        }

        .iq-result-meta-item .label {
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.55);
        }

        .iq-result-meta-item .value {
          font-size: 0.9375rem;
          font-weight: 700;
          color: #fff;
          text-align: right;
          overflow-wrap: normal;
        }

        /* Pickup → delivery route strip above the quote breakdown. */
        .iq-route {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.4rem 0.6rem;
          margin-bottom: 1.1rem;
          font-family: var(--font-primary);
          font-size: 0.8125rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.82);
        }

        .iq-route__pt {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          min-width: 0;
        }

        .iq-route__dot {
          flex: 0 0 auto;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #5fbf5f;
          box-shadow: 0 0 6px rgba(95, 191, 95, 0.7);
        }

        .iq-route__pt--end .iq-route__dot {
          background: #E31E24;
          box-shadow: 0 0 6px rgba(227, 30, 36, 0.6);
        }

        .iq-route__arrow {
          color: rgba(255, 255, 255, 0.4);
        }

        /* Secondary "get a quote on call" action under the pay button. */
        .iq-call-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          margin-top: 0.7rem;
          padding: 0.8rem 1.25rem;
          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.04);
          color: #fff;
          font-family: var(--font-primary);
          font-size: 0.875rem;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.15s ease, border-color 0.15s ease;
        }

        .iq-call-btn:hover {
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(255, 255, 255, 0.35);
        }

        /* Tablet: 4-field rows fold down to 2 per row (768px–1199px). */
        @media (max-width: 1199px) {
          .iq-row-3,
          .iq-row-4 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        /* Mobile: form and quote card stack, every row goes to 1 column. */
        @media (max-width: 767px) {
          .iq-layout {
            max-width: none;
            grid-template-columns: 1fr;
          }

          .iq-row-2,
          .iq-row-3,
          .iq-row-4 {
            grid-template-columns: 1fr;
          }

          .iq-section {
            padding: 4rem 1.25rem;
          }

          .iq-form {
            padding: 0;
          }

          .iq-results-panel {
            position: static;
            height: auto;
            min-height: 350px;
            clip-path: none !important;
            border-radius: 24px;
            padding: 1.5rem;
          }
        }

        /* --- Simplified booking form: grouping, controls & accessibility --- */
        .iq-fieldset {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          min-width: 0;
          margin: 0;
          padding: 0;
          border: 0;
        }

        /* Force the legend to flow as a normal block directly above the
           fields (not the UA's special border-notch placement), so every
           section heading sits consistently above its group. */
        .iq-fieldset > legend {
          display: block;
          float: none;
          width: 100%;
          padding: 0;
          margin: 0;
        }

        .iq-req {
          margin-left: 0.15rem;
          color: #E31E24;
          font-weight: 700;
        }

        .iq-field-note {
          align-self: center;
          margin: 0;
          font-family: var(--font-primary);
          font-size: 0.72rem;
          line-height: 1.5;
          color: rgba(5, 36, 36, 0.62);
        }

        /* Visually hidden but available to screen readers. */
        .iq-sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0 0 0 0);
          clip-path: inset(50%);
          white-space: nowrap;
          border: 0;
        }

        /* Always-visible privacy note at the foot of the form. */
        .iq-form-privacy {
          display: flex;
          gap: 0.5rem;
          margin: 0.35rem 0 0;
          font-family: var(--font-primary);
          font-size: 0.72rem;
          line-height: 1.55;
          color: rgba(5, 36, 36, 0.6);
        }

        .iq-form-privacy::before {
          content: "";
          flex: 0 0 auto;
          width: 8px;
          height: 8px;
          margin-top: 0.35rem;
          border-radius: 50%;
          background: #7a9900;
          box-shadow: 0 0 0 3px rgba(122, 153, 0, 0.18);
        }

        .iq-form-privacy a {
          color: #E31E24;
          font-weight: 600;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        /* Error state is conveyed by text + red border + icon-free copy —
           never colour alone. */
        .iq-input[aria-invalid="true"],
        .iq-select-native[aria-invalid="true"] {
          border-bottom-color: #b91c1c;
        }

        .iq-field-error {
          display: block;
        }

        /* Visible keyboard focus for every interactive control. */
        .iq-input:focus-visible,
        .iq-select-native:focus-visible,
        .iq-slider-input:focus-visible,
        .iq-check input:focus-visible,
        .iq-suggestion:focus-visible,
        .iq-pay-btn:focus-visible,
        .iq-call-btn:focus-visible,
        .iq-form-privacy a:focus-visible,
        .iq-consent-note a:focus-visible {
          outline: 2px solid #E31E24;
          outline-offset: 2px;
          border-radius: 2px;
        }

        .iq-select-native {
          appearance: none;
          -webkit-appearance: none;
          background-color: transparent;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23052424' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.15rem center;
          padding-right: 1.4rem;
          cursor: pointer;
        }

        .iq-check {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 0;
          min-width: 0;
          font-family: var(--font-primary);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--c-gray);
          cursor: pointer;
        }

        .iq-check input {
          width: 16px;
          height: 16px;
          margin: 0;
          flex-shrink: 0;
          accent-color: #E31E24;
          cursor: pointer;
        }

      `}</style>
    </section>
  );
}

function EmptyResults({ submitting }: { submitting: boolean }) {
  return (
    <motion.div
      className="iq-empty"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PackageSearch size={40} strokeWidth={1.5} />
      <p>
        {submitting
          ? "Calculating your price…"
          : "Fill out your shipment details to see your instant price here."}
      </p>
    </motion.div>
  );
}

const resultMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
};

function ResultPanel({
  result,
  checkingOut,
  recalculating,
  onCheckout,
}: {
  result: QuoteResult;
  checkingOut: boolean;
  recalculating: boolean;
  onCheckout: (quoteRequestId: string) => void;
}) {
  if (!result.ok) {
    return (
      <motion.div {...resultMotion}>
        <p className="iq-result-error">{result.error ?? "Unable to calculate a quote right now."}</p>
      </motion.div>
    );
  }

  if (result.oversized) {
    return (
      <motion.div {...resultMotion}>
        <p className="iq-result-warn">
          This shipment exceeds our standard truck types. Please{" "}
          <a href="#contact">contact us</a> for a custom quote.
        </p>
      </motion.div>
    );
  }

  const pickupLabel = shortPlace(result.pickupCoords?.label);
  const deliveryLabel = shortPlace(result.deliveryCoords?.label);

  return (
    <motion.div {...resultMotion}>
      {pickupLabel && deliveryLabel ? (
        <div className="iq-route">
          <span className="iq-route__pt">
            <span className="iq-route__dot" />
            {pickupLabel}
          </span>
          <span className="iq-route__arrow" aria-hidden="true">
            &rarr;
          </span>
          <span className="iq-route__pt iq-route__pt--end">
            <span className="iq-route__dot" />
            {deliveryLabel}
          </span>
        </div>
      ) : null}

      <div className="iq-result-meta">
        <motion.div
          className="iq-result-meta-item"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="label">Truck</span>
          <span className="value">{result.truckType?.name}</span>
        </motion.div>
        <motion.div
          className="iq-result-meta-item"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.17 }}
        >
          <span className="label">Distance</span>
          <span className="value">{result.distanceMiles} mi</span>
        </motion.div>
        <motion.div
          className="iq-result-meta-item"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
        >
          <span className="label">Drive time</span>
          <span className="value">{result.durationMinutes} min</span>
        </motion.div>
      </div>
      <p className="iq-estimate-disclaimer">
        This is an automated estimate. Final pricing is confirmed when we schedule your pickup.
      </p>

      {result.quoteRequestId ? (
        <div className="iq-confirm-box">
          <h4>Ready to book?</h4>
          <p>Confirm this quote and pay now to lock in your price and schedule pickup.</p>
          <motion.button
            type="button"
            className="iq-pay-btn"
            aria-label="Confirm order and continue to secure payment"
            disabled={checkingOut || recalculating}
            onClick={() => onCheckout(result.quoteRequestId!)}
            whileHover={checkingOut || recalculating ? undefined : { scale: 1.015, y: -1 }}
            whileTap={checkingOut || recalculating ? undefined : { scale: 0.98 }}
          >
            {checkingOut ? "Redirecting…" : recalculating ? "Updating price…" : "Confirm Order — Pay Now"}
          </motion.button>
          <a href="tel:+18609883887" className="iq-call-btn">
            <Phone size={15} strokeWidth={2.25} />
            Prefer to talk? Get a quote on call
          </a>
          <p className="iq-consent-note">
            By continuing you agree to our <Link href={PRIVACY_POLICY_HREF}>Privacy Policy</Link>,
            Terms of Service, and Cancellation Policy. After payment your booking is{" "}
            <strong>received</strong> — it&apos;s confirmed once a driver is assigned.
          </p>
        </div>
      ) : null}
    </motion.div>
  );
}

// "Midland, TX, United States" -> "Midland, TX"
function shortPlace(label: string | undefined): string {
  if (!label) return "";
  return label.split(",").slice(0, 2).join(",").trim();
}

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [value]);

  return <>{display.toFixed(2)}</>;
}

function FieldLabel({ id, label, required }: { id: string; label: string; required?: boolean }) {
  return (
    <label className="iq-label" htmlFor={id}>
      {label}
      {required ? (
        <span className="iq-req" aria-hidden="true">
          *
        </span>
      ) : null}
    </label>
  );
}

function TextInput({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  autoComplete,
  min,
  max,
  step,
  inputMode,
  required,
  error,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  type?: "text" | "email" | "tel" | "date" | "time" | "number";
  autoComplete?: string;
  min?: string;
  max?: string;
  step?: string;
  inputMode?: "numeric" | "decimal" | "tel" | "email";
  required?: boolean;
  error?: string;
}) {
  const errorId = `${id}-error`;
  return (
    <div className="iq-field">
      <FieldLabel id={id} label={label} required={required} />
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        autoComplete={autoComplete}
        min={min}
        max={max}
        step={step}
        inputMode={inputMode}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="iq-input"
      />
      {error ? (
        <span id={errorId} role="alert" className="iq-field-error">
          {error}
        </span>
      ) : null}
    </div>
  );
}

function SelectField({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  options,
  placeholderOption,
  required,
  error,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: { id: string; name: string }[];
  placeholderOption: string;
  required?: boolean;
  error?: string;
}) {
  const errorId = `${id}-error`;
  return (
    <div className="iq-field">
      <FieldLabel id={id} label={label} required={required} />
      <select
        id={id}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="iq-input iq-select-native"
      >
        <option value="">{placeholderOption}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error ? (
        <span id={errorId} role="alert" className="iq-field-error">
          {error}
        </span>
      ) : null}
    </div>
  );
}

function CheckboxField({
  id,
  name,
  label,
  checked,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="iq-check" htmlFor={id}>
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}

function SliderField({
  id,
  name,
  label,
  hideLabel,
  unit,
  min,
  max,
  step,
  value,
  onChange,
  onBlur,
  required,
  error,
}: {
  id: string;
  name: string;
  label: string;
  hideLabel?: boolean;
  unit: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  onBlur?: () => void;
  required?: boolean;
  error?: string;
}) {
  const errorId = `${id}-error`;
  const percent = max > min ? ((value - min) / (max - min)) * 100 : 0;

  return (
    <div className="iq-slider-field">
      <div className="iq-slider-header">
        {hideLabel ? (
          <label htmlFor={id} className="iq-sr-only">
            {label}
          </label>
        ) : (
          <FieldLabel id={id} label={label} required={required} />
        )}
        <span className="iq-slider-value" aria-hidden="true">
          {value.toLocaleString()}
          <span>{unit}</span>
        </span>
      </div>
      <input
        id={id}
        name={name}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        onBlur={onBlur}
        className="iq-slider-input"
        aria-valuetext={`${value.toLocaleString()} ${unit}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        style={{
          background: `linear-gradient(to right, #E31E24 ${percent}%, rgba(5, 36, 36, 0.15) ${percent}%)`,
        }}
      />
      <div className="iq-slider-scale" aria-hidden="true">
        <span>
          {min.toLocaleString()} {unit}
        </span>
        <span>
          {max.toLocaleString()} {unit}
        </span>
      </div>
      {error ? (
        <span id={errorId} role="alert" className="iq-field-error">
          {error}
        </span>
      ) : null}
    </div>
  );
}

function TextAreaField({
  id,
  name,
  label,
  value,
  onChange,
  maxLength,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
}) {
  return (
    <div className="iq-field">
      <FieldLabel id={id} label={label} />
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        maxLength={maxLength}
        className="iq-input iq-textarea"
        placeholder="Commodity, handling requirements, accessorials, or other instructions"
      />
    </div>
  );
}

