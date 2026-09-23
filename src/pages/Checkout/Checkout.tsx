import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Check, Smartphone, CreditCard, Landmark } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import { cn } from '../../utils/cn';

type Step = 1 | 2 | 3;

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface DeliveryInfo {
  street: string;
  city: string;
  region: string;
  deliveryOption: 'accra-same-day' | 'nationwide' | 'pickup';
}

type PaymentMethod = 'paystack' | 'momo-mtn' | 'momo-vodafone' | 'momo-airteltigo';

const GHANA_REGIONS = [
  'Greater Accra',
  'Ashanti',
  'Western',
  'Central',
  'Eastern',
  'Northern',
  'Volta',
  'Upper East',
  'Upper West',
  'Bono',
  'Ahafo',
  'Bono East',
  'Oti',
  'Savannah',
  'North East',
  'Western North',
];

const DELIVERY_OPTIONS = [
  {
    id: 'accra-same-day' as const,
    label: 'Accra Same-Day Delivery',
    description: 'Delivered today in Greater Accra',
    fee: 30,
  },
  {
    id: 'nationwide' as const,
    label: 'Nationwide Delivery',
    description: '2-3 business days',
    fee: 50,
  },
  {
    id: 'pickup' as const,
    label: 'Store Pickup',
    description: 'Pick up from our Accra store - free',
    fee: 0,
  },
];

const PAYMENT_METHODS: {
  id: PaymentMethod;
  label: string;
  description: string;
  icon: typeof Smartphone;
}[] = [
  {
    id: 'paystack',
    label: 'Paystack',
    description: 'Pay securely with card, bank transfer, or USSD',
    icon: CreditCard,
  },
  {
    id: 'momo-mtn',
    label: 'MTN Mobile Money',
    description: 'Pay with MTN MoMo',
    icon: Smartphone,
  },
  {
    id: 'momo-vodafone',
    label: 'Vodafone Cash',
    description: 'Pay with Vodafone Cash',
    icon: Smartphone,
  },
  {
    id: 'momo-airteltigo',
    label: 'AirtelTigo Money',
    description: 'Pay with AirtelTigo Money',
    icon: Smartphone,
  },
];

const FREE_DELIVERY_THRESHOLD = 500;

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();

  const [step, setStep] = useState<Step>(1);
  const [processing, setProcessing] = useState(false);

  const [customer, setCustomer] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [delivery, setDelivery] = useState<DeliveryInfo>({
    street: '',
    city: '',
    region: 'Greater Accra',
    deliveryOption: 'accra-same-day',
  });

  const [payment, setPayment] = useState<PaymentMethod>('paystack');

  const deliveryOption = DELIVERY_OPTIONS.find((d) => d.id === delivery.deliveryOption)!;
  const baseFee = deliveryOption.fee;
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : baseFee;
  const total = subtotal + deliveryFee;

  if (items.length === 0 && !processing) {
    return (
      <div className="max-w-[1280px] mx-auto px-6 py-24 text-center">
        <h1 className="font-heading text-4xl mb-4">Your bag is empty</h1>
        <p className="text-muted mb-8">Add items before proceeding to checkout.</p>
        <Link
          to="/shop"
          className="inline-block bg-primary text-background text-xs uppercase tracking-widest px-8 py-4"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const canContinueStep1 =
    customer.firstName && customer.lastName && customer.email && customer.phone;

  const canContinueStep2 =
    delivery.deliveryOption === 'pickup' ||
    (delivery.street && delivery.city && delivery.region);

  const handlePlaceOrder = () => {
    setProcessing(true);
    setTimeout(() => {
      const orderId = 'MAL-' + Date.now().toString().slice(-8);
      const order = {
        id: orderId,
        date: new Date().toISOString(),
        items,
        customer,
        delivery,
        payment,
        subtotal,
        deliveryFee,
        total,
        status: 'placed' as const,
      };

      try {
        const existing = JSON.parse(localStorage.getItem('malic_orders') ?? '[]');
        localStorage.setItem('malic_orders', JSON.stringify([order, ...existing]));
      } catch {
        // ignore
      }

      clearCart();
      navigate('/order-confirmation', { state: { orderId } });
    }, 1400);
  };

  return (
    <div className="bg-background">
      {/* Header */}
      <section className="border-b border-border bg-surface">
        <div className="max-w-[1280px] mx-auto px-6 py-8">
          <nav className="text-xs uppercase tracking-widest text-muted mb-3">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/cart" className="hover:text-primary">Bag</Link>
            <span className="mx-2">/</span>
            <span className="text-primary">Checkout</span>
          </nav>
          <h1 className="font-heading text-4xl md:text-5xl">Checkout</h1>
        </div>
      </section>

      {/* Steps indicator */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-[1280px] mx-auto px-6 py-5 flex items-center gap-4 text-xs uppercase tracking-widest">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex items-center gap-2">
              <span
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center',
                  step > n
                    ? 'bg-success text-background'
                    : step === n
                      ? 'bg-primary text-background'
                      : 'bg-border text-muted',
                )}
              >
                {step > n ? <Check className="w-3 h-3" /> : n}
              </span>
              <span className={cn(step >= n ? 'text-text' : 'text-muted')}>
                {n === 1 ? 'Information' : n === 2 ? 'Delivery' : 'Payment'}
              </span>
              {n < 3 && <ChevronRight className="w-3 h-3 text-muted" />}
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <section className="max-w-[1280px] mx-auto px-6 py-12 grid lg:grid-cols-[1fr_400px] gap-12">
        {/* Form */}
        <div>
          {/* STEP 1 — Customer */}
          {step === 1 && (
            <div>
              <h2 className="font-heading text-2xl mb-6">Contact Information</h2>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={customer.firstName}
                      onChange={(e) =>
                        setCustomer({ ...customer, firstName: e.target.value })
                      }
                      className="w-full border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={customer.lastName}
                      onChange={(e) =>
                        setCustomer({ ...customer, lastName: e.target.value })
                      }
                      className="w-full border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={customer.email}
                    onChange={(e) =>
                      setCustomer({ ...customer, email: e.target.value })
                    }
                    className="w-full border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(e) =>
                      setCustomer({ ...customer, phone: e.target.value })
                    }
                    placeholder="+233 XX XXX XXXX"
                    className="w-full border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <button
                  type="button"
                  disabled={!canContinueStep1}
                  onClick={() => setStep(2)}
                  className={cn(
                    'w-full text-xs uppercase tracking-widest py-4 transition-colors',
                    canContinueStep1
                      ? 'bg-primary text-background hover:bg-accent'
                      : 'bg-border text-muted cursor-not-allowed',
                  )}
                >
                  Continue to Delivery
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 — Delivery */}
          {step === 2 && (
            <div>
              <h2 className="font-heading text-2xl mb-6">Delivery Address</h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={delivery.street}
                    onChange={(e) =>
                      setDelivery({ ...delivery, street: e.target.value })
                    }
                    className="w-full border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2">
                      City / Town
                    </label>
                    <input
                      type="text"
                      value={delivery.city}
                      onChange={(e) =>
                        setDelivery({ ...delivery, city: e.target.value })
                      }
                      className="w-full border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2">
                      Region
                    </label>
                    <select
                      value={delivery.region}
                      onChange={(e) =>
                        setDelivery({ ...delivery, region: e.target.value })
                      }
                      className="w-full border border-border bg-surface px-4 py-3 text-sm focus:outline-none focus:border-primary"
                    >
                      {GHANA_REGIONS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest mb-3">
                    Delivery Method
                  </label>
                  <div className="space-y-3">
                    {DELIVERY_OPTIONS.map((opt) => {
                      const active = delivery.deliveryOption === opt.id;
                      const isFree = subtotal >= FREE_DELIVERY_THRESHOLD;
                      const displayFee = isFree ? 0 : opt.fee;
                      return (
                        <label
                          key={opt.id}
                          className={cn(
                            'flex items-start gap-4 p-4 border cursor-pointer transition-colors',
                            active
                              ? 'border-primary bg-surface'
                              : 'border-border hover:border-primary',
                          )}
                        >
                          <input
                            type="radio"
                            name="delivery-option"
                            checked={active}
                            onChange={() =>
                              setDelivery({ ...delivery, deliveryOption: opt.id })
                            }
                            className="accent-primary mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-baseline justify-between">
                              <span className="text-sm font-medium">{opt.label}</span>
                              <span className="text-sm font-semibold">
                                {displayFee === 0 ? 'FREE' : formatPrice(displayFee)}
                              </span>
                            </div>
                            <p className="text-xs text-muted mt-1">{opt.description}</p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 border border-primary text-xs uppercase tracking-widest py-4 hover:bg-primary hover:text-background transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!canContinueStep2}
                    onClick={() => setStep(3)}
                    className={cn(
                      'flex-1 text-xs uppercase tracking-widest py-4 transition-colors',
                      canContinueStep2
                        ? 'bg-primary text-background hover:bg-accent'
                        : 'bg-border text-muted cursor-not-allowed',
                    )}
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 — Payment */}
          {step === 3 && (
            <div>
              <h2 className="font-heading text-2xl mb-2">Payment Method</h2>
              <p className="text-sm text-muted mb-6">
                All payments are processed securely.
              </p>

              <div className="space-y-3 mb-6">
                {PAYMENT_METHODS.map((m) => {
                  const active = payment === m.id;
                  const Icon = m.icon;
                  return (
                    <label
                      key={m.id}
                      className={cn(
                        'flex items-start gap-4 p-4 border cursor-pointer transition-colors',
                        active
                          ? 'border-primary bg-surface'
                          : 'border-border hover:border-primary',
                      )}
                    >
                      <input
                        type="radio"
                        name="payment-method"
                        checked={active}
                        onChange={() => setPayment(m.id)}
                        className="accent-primary mt-1"
                      />
                      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="text-sm font-medium">{m.label}</span>
                        <p className="text-xs text-muted mt-1">{m.description}</p>
                      </div>
                    </label>
                  );
                })}
              </div>

              <div className="border border-border bg-surface p-4 mb-6 flex gap-3">
                <Landmark className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium mb-1">Secure Payment</p>
                  <p className="text-xs text-muted leading-relaxed">
                    Your transaction is encrypted and processed through a
                    PCI-DSS compliant gateway. We never store your card or
                    Mobile Money PIN.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 border border-primary text-xs uppercase tracking-widest py-4 hover:bg-primary hover:text-background transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={processing}
                  onClick={handlePlaceOrder}
                  className={cn(
                    'flex-1 text-xs uppercase tracking-widest py-4 transition-colors',
                    processing
                      ? 'bg-border text-muted cursor-wait'
                      : 'bg-primary text-background hover:bg-accent',
                  )}
                >
                  {processing ? 'Placing order...' : `Pay ${formatPrice(total)}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <aside className="lg:sticky lg:top-24 h-fit border border-border bg-surface p-6">
          <h3 className="font-heading text-xl mb-6">Order Summary</h3>

          <ul className="space-y-4 mb-6 max-h-[300px] overflow-y-auto">
            {items.map((item) => {
              const price = item.product.salePrice ?? item.product.price;
              const key = `${item.variant.id}-${item.size}`;
              return (
                <li key={key} className="flex gap-3">
                  <div className="w-16 h-20 flex-shrink-0 overflow-hidden bg-border">
                    <img
                      src={item.variant.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{item.product.name}</p>
                    <p className="text-xs text-muted">
                      {item.variant.colorName} / {item.size} x {item.quantity}
                    </p>
                    <p className="text-sm font-semibold mt-1">
                      {formatPrice(price * item.quantity)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="space-y-2 pt-4 border-t border-border text-sm">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>
              <span className="text-text">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Delivery</span>
              <span className="text-text">
                {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
              </span>
            </div>
          </div>

          <div className="flex justify-between pt-4 mt-4 border-t border-border text-base font-semibold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </aside>
      </section>
    </div>
  );
}