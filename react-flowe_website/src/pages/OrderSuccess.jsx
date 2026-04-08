import { useLocation, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function OrderSuccess() {
  const { state } = useLocation();

  return (
    <div className="min-h-screen bg-[#fdf6f0] font-[Jost] flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        <CheckCircle size={56} strokeWidth={1} className="text-[#c4957a] mx-auto mb-6" />
        <h1 className="font-[Cormorant_Garamond] text-3xl md:text-4xl text-[#5c3d35] mb-3">
          Order Placed! 🌸
        </h1>
        <p className="text-[13px] font-light text-[#8b5e52] mb-2">
          Thank you, <strong>{state?.name}</strong>!
        </p>
        <p className="text-[12px] text-[#b09088] mb-1">
          Payment ID: <span className="text-[#c4957a] break-all">{state?.paymentId}</span>
        </p>
        <p className="text-[12px] text-[#b09088] mb-8">
          A confirmation will be sent to <strong>{state?.email}</strong>
        </p>
        <Link to="/shop"
          className="text-xs tracking-widest uppercase text-white bg-[#c4957a]
            hover:bg-[#b0806a] px-8 py-3 rounded-sm transition-colors inline-block">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}