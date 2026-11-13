import React, { useState } from 'react';
import { useCustomizer } from '../context/CustomizerContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Tag,
  CheckCircle2,
  CreditCard,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CartView: React.FC = () => {
  const {
    cart,
    cartTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
    setCurrentScreen,
    freeShippingThreshold,
    freeShippingProgress,
    showToast,
  } = useCustomizer();

  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percent: number } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);

  // Checkout form
  const [checkoutData, setCheckoutData] = useState({
    name: 'Nerisa Guillermo',
    email: 'nerisa.guillermo0315@gmail.com',
    address: '10 Orchard Road, #04-12',
    postalCode: '238833',
    city: 'Singapore',
  });

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'SHIELD10' || code === 'MONTIGO10') {
      setAppliedDiscount({ code, percent: 10 });
      setPromoError(null);
      showToast('Promo code applied: 10% OFF!');
    } else if (code === 'PROTECT15') {
      setAppliedDiscount({ code, percent: 15 });
      setPromoError(null);
      showToast('Promo code applied: 15% OFF!');
    } else {
      setPromoError('Invalid promo code. Try "SHIELD10" or "PROTECT15"');
    }
  };

  const discountAmount = appliedDiscount
    ? Number(((cartTotal * appliedDiscount.percent) / 100).toFixed(2))
    : 0;

  const shippingCost = cartTotal >= freeShippingThreshold || cartTotal === 0 ? 0 : 5.0;
  const finalPayable = Math.max(0, Number((cartTotal - discountAmount + shippingCost).toFixed(2)));

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-stone-900" />
            <span>Your Shopping Bag</span>
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Review your customized bottle shield kits and silicone protector accessories.
          </p>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-stone-500 hover:text-rose-600 transition-colors flex items-center gap-1 self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Bag</span>
          </button>
        )}
      </div>

      {/* Free Shipping Progress Card */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-stone-800 flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-emerald-600" />
            {cartTotal >= freeShippingThreshold ? (
              <span className="text-emerald-700">Congratulations! You unlocked Free Shipping!</span>
            ) : (
              <span>
                Add ${(freeShippingThreshold - cartTotal).toFixed(2)} SGD more for Free Islandwide Shipping
              </span>
            )}
          </span>
          <span className="font-bold text-stone-600">{freeShippingProgress}%</span>
        </div>
        <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-stone-300 p-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-900">Your bag is empty</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
              Start building your customized bottle with shockproof silicone protector boot or browse our protector store.
            </p>
          </div>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => setCurrentScreen('customizer')}
              className="px-5 py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs shadow-md hover:bg-stone-800 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Launch Customiser</span>
            </button>
            <button
              onClick={() => setCurrentScreen('catalog')}
              className="px-4 py-2.5 rounded-xl bg-stone-100 text-stone-700 font-semibold text-xs hover:bg-stone-200 transition-all"
            >
              Browse Protector Shop
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-white rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                {/* Thumbnail & Info */}
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-2xl bg-stone-100 p-2 flex items-center justify-center shrink-0 border border-stone-200/60 overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-contain filter drop-shadow-sm"
                    />
                    {item.type === 'custom_kit' && (
                      <span className="absolute bottom-1 right-1 text-[8px] bg-emerald-600 text-white px-1 rounded-sm font-bold">
                        KIT
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-stone-900 leading-snug">
                        {item.title}
                      </h3>
                      {item.originalPrice > item.unitPrice && (
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full">
                          10% OFF
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500">{item.subtitle}</p>

                    {/* Detailed Kit Specs */}
                    {item.details && (
                      <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] text-stone-600">
                        {item.details.bootTitle && (
                          <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md font-medium border border-emerald-200">
                            🛡️ {item.details.bootTitle} ({item.details.bootColor})
                          </span>
                        )}
                        {item.details.capTitle && (
                          <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md font-medium">
                            🥤 {item.details.capTitle}
                          </span>
                        )}
                        {item.details.engravingText && (
                          <span className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md font-medium border border-amber-200">
                            ✍️ Engraved: "{item.details.engravingText}"
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Pricing, Quantity & Remove */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 bg-stone-100 rounded-xl p-1 border border-stone-200">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1 rounded-lg hover:bg-stone-200 text-stone-700 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold text-stone-900 w-5 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1 rounded-lg hover:bg-stone-200 text-stone-700 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-stone-900">
                      ${(item.unitPrice * item.quantity).toFixed(2)} SGD
                    </div>
                    {item.originalPrice > item.unitPrice && (
                      <div className="text-[11px] text-stone-400 line-through">
                        ${(item.originalPrice * item.quantity).toFixed(2)}
                      </div>
                    )}
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary & Checkout Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-5">
              <h3 className="text-base font-bold text-stone-900">Order Summary</h3>

              {/* Promo Code Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-stone-500">
                  Have a discount code?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="e.g. SHIELD10"
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-300 uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-3.5 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-[11px] text-rose-600 font-medium">{promoError}</p>
                )}
                {appliedDiscount && (
                  <p className="text-[11px] text-emerald-600 font-medium">
                    ✓ Code {appliedDiscount.code} applied ({appliedDiscount.percent}% OFF)
                  </p>
                )}
              </div>

              {/* Line items */}
              <div className="space-y-2.5 pt-4 border-t border-stone-100 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">${cartTotal.toFixed(2)} SGD</span>
                </div>

                {appliedDiscount && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({appliedDiscount.code})</span>
                    <span>-${discountAmount.toFixed(2)} SGD</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0 ? (
                      <strong className="text-emerald-700">FREE</strong>
                    ) : (
                      `$${shippingCost.toFixed(2)} SGD`
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>GST / Tax</span>
                  <span className="text-stone-400">Included (9%)</span>
                </div>
              </div>

              {/* Total */}
              <div className="pt-4 border-t border-stone-200 flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-bold text-stone-500 uppercase">Estimated Total</span>
                  <div className="text-xl font-extrabold text-stone-900">
                    ${finalPayable.toFixed(2)} SGD
                  </div>
                </div>
                <span className="text-[10px] text-stone-400 font-medium">Taxes included</span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => setIsCheckoutModalOpen(true)}
                className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>30-Day Montigo Protector Satisfaction Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200 animate-fadeIn overflow-hidden">
            <button
              onClick={() => {
                setIsCheckoutModalOpen(false);
                setOrderComplete(false);
              }}
              className="absolute top-5 right-5 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            >
              <X className="w-4 h-4" />
            </button>

            {!orderComplete ? (
              <form onSubmit={handleCompleteOrder} className="space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-emerald-600" />
                    <span>Complete Your Order</span>
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Total: <strong className="text-stone-900">${finalPayable.toFixed(2)} SGD</strong>
                  </p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      value={checkoutData.name}
                      onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700 block mb-1">Email</label>
                    <input
                      required
                      type="email"
                      value={checkoutData.email}
                      onChange={(e) => setCheckoutData({ ...checkoutData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Delivery Address</label>
                      <input
                        required
                        type="text"
                        value={checkoutData.address}
                        onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-1 focus:ring-stone-900 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-stone-700 block mb-1">Postal Code</label>
                      <input
                        required
                        type="text"
                        value={checkoutData.postalCode}
                        onChange={(e) => setCheckoutData({ ...checkoutData, postalCode: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:ring-1 focus:ring-stone-900 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600">
                  <div className="flex items-center gap-1.5 font-bold text-stone-800 mb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Instant Order Confirmation</span>
                  </div>
                  <span>Your custom protective bottle gear will be assembled &amp; dispatched in 1-2 business days.</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                >
                  Confirm &amp; Place Order (${finalPayable.toFixed(2)} SGD)
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-stone-900">
                    Order Confirmed!
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Thank you, {checkoutData.name}! Your order has been placed.
                  </p>
                </div>
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-left space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Order Reference:</span>
                    <strong className="font-mono text-stone-900">MTG-2026-SHIELD-{Math.floor(1000 + Math.random() * 9000)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Estimated Delivery:</span>
                    <strong className="text-emerald-700">2-3 Business Days</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Destination:</span>
                    <span className="text-stone-800">{checkoutData.address}, SG {checkoutData.postalCode}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    clearCart();
                    setIsCheckoutModalOpen(false);
                    setOrderComplete(false);
                    setCurrentScreen('customizer');
                  }}
                  className="w-full py-3 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800 transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
