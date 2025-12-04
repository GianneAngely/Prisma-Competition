import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  DollarSign,
  Users,
  Clock,
  Plus,
  Check,
  X,
  Bell,
  Calendar,
  CreditCard,
  TrendingUp,
  AlertCircle,
  ChevronRight,
  Edit,
  Trash2,
  Share2,
  Smartphone,
  Building2,
  Wallet,
  QrCode,
} from "lucide-react";

export default function SplitReminder() {
  const [showAddBill, setShowAddBill] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [activeTab, setActiveTab] = useState("current");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const paymentMethods = [
    {
      id: "gopay",
      name: "GoPay",
      color: "from-green-500 to-green-600",
      description: "Bayar dengan GoPay Balance",
    },
    {
      id: "dana",
      name: "DANA",
      color: "from-blue-500 to-blue-600",
      description: "Bayar dengan DANA Balance",
    },
    {
      id: "ovo",
      name: "OVO",
      color: "from-purple-500 to-purple-600",
      description: "Bayar dengan OVO Points/Cash",
    },
    {
      id: "qris",
      name: "QRIS",
      color: "from-red-500 to-red-600",
      description: "Scan QR Code",
    },
    {
      id: "transfer",
      name: "Transfer Bank",
      color: "from-gray-600 to-gray-700",
      description: "Transfer ke rekening bank",
    },
  ];

  const stats = [
    {
      label: "Total Tagihan Bulan Ini",
      value: "Rp 2.4jt",
      icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-forest-main to-forest-light",
      change: "+3 tagihan baru",
    },
    {
      label: "Bagian Kamu",
      value: "Rp 600rb",
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-gold to-gold-light",
      change: "Split 4 orang",
    },
    {
      label: "Belum Dibayar",
      value: "2 Tagihan",
      icon: <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-red-500 to-red-600",
      change: "Jatuh tempo 3 hari",
    },
    {
      label: "Total Terbayar",
      value: "Rp 18.5jt",
      icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "from-green-500 to-green-600",
      change: "Sepanjang tahun",
    },
  ];

  const currentBills = [
    {
      id: 1,
      name: "Listrik",
      icon: "⚡",
      totalAmount: 600000,
      splitCount: 4,
      yourShare: 150000,
      dueDate: "2025-12-05",
      status: "pending",
      paidBy: ["Andi", "Budi"],
      unpaidBy: ["You", "Siti"],
    },
    {
      id: 2,
      name: "Air",
      icon: "💧",
      totalAmount: 300000,
      splitCount: 4,
      yourShare: 75000,
      dueDate: "2025-12-05",
      status: "pending",
      paidBy: ["Andi"],
      unpaidBy: ["You", "Budi", "Siti"],
    },
    {
      id: 3,
      name: "WiFi",
      icon: "📡",
      totalAmount: 400000,
      splitCount: 4,
      yourShare: 100000,
      dueDate: "2025-12-10",
      status: "paid",
      paidBy: ["You", "Andi", "Budi", "Siti"],
      unpaidBy: [],
    },
    {
      id: 4,
      name: "Gas",
      icon: "🔥",
      totalAmount: 200000,
      splitCount: 4,
      yourShare: 50000,
      dueDate: "2025-12-08",
      status: "paid",
      paidBy: ["You", "Andi", "Budi", "Siti"],
      unpaidBy: [],
    },
  ];

  const upcomingReminders = [
    {
      id: 1,
      title: "Listrik jatuh tempo",
      date: "2025-12-05",
      time: "09:00",
      amount: 150000,
      type: "urgent",
    },
    {
      id: 2,
      title: "Air jatuh tempo",
      date: "2025-12-05",
      time: "09:00",
      amount: 75000,
      type: "urgent",
    },
    {
      id: 3,
      title: "Gas jatuh tempo",
      date: "2025-12-08",
      time: "09:00",
      amount: 50000,
      type: "normal",
    },
  ];

  const roommates = [
    { name: "You", avatar: "YO", color: "bg-gold" },
    { name: "Andi", avatar: "AN", color: "bg-forest-main" },
    { name: "Budi", avatar: "BU", color: "bg-blue-500" },
    { name: "Siti", avatar: "SI", color: "bg-purple-500" },
  ];

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handlePayNow = (bill) => {
    setSelectedBill(bill);
    setShowPayment(true);
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleConfirmPayment = () => {
    alert(`Pembayaran berhasil via ${selectedPaymentMethod.name}!`);
    setShowPayment(false);
    setSelectedPaymentMethod(null);
    setSelectedBill(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse-urgent {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(239, 68, 68, 0);
          }
        }
        
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        
        @keyframes ring {
          0% {
            transform: rotate(0deg);
          }
          10% {
            transform: rotate(15deg);
          }
          20% {
            transform: rotate(-15deg);
          }
          30% {
            transform: rotate(10deg);
          }
          40% {
            transform: rotate(-10deg);
          }
          50% {
            transform: rotate(5deg);
          }
          60% {
            transform: rotate(-5deg);
          }
          70% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
        
        @media (prefers-reduced-motion: no-preference) {
          .animate-fade-in-down {
            animation: fadeInDown 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          }
          
          .animate-fade-in-up {
            animation: fadeInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          }
          
          .animate-fade-in-left {
            animation: fadeInLeft 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          }
          
          .animate-fade-in-right {
            animation: fadeInRight 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          }
          
          .animate-scale-in {
            animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          
          .animate-slide-up {
            animation: slideUp 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          }
          
          .stagger-item {
            opacity: 0;
            animation: fadeInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          }
          
          .bill-animate {
            animation: fadeInUp 0.4s cubic-bezier(0.23, 1, 0.32, 1) both;
          }
          
          .stat-card {
            will-change: transform, box-shadow;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .stat-card:hover {
            transform: translateY(-6px) scale(1.02);
            box-shadow: 0 25px 30px -5px rgba(0, 0, 0, 0.15);
          }
          
          .stat-card:hover .stat-icon {
            transform: scale(1.1) rotate(5deg);
          }
          
          .stat-icon {
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          
          .bill-card {
            will-change: transform, box-shadow;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .bill-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          }
          
          .bill-card.urgent {
            animation: pulse-urgent 2s ease-in-out infinite;
          }
          
          .bill-icon {
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          
          .bill-card:hover .bill-icon {
            transform: scale(1.15);
          }
          
          .reminder-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .reminder-card:hover {
            transform: translateX(4px);
          }
          
          .reminder-card.urgent {
            animation: pulse-urgent 2s ease-in-out infinite;
          }
          
          .avatar-bounce {
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          
          .avatar-bounce:hover {
            transform: translateY(-4px) scale(1.1);
          }
          
          .button-interactive {
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .button-interactive:hover {
            transform: scale(1.05);
          }
          
          .button-interactive:active {
            transform: scale(0.95);
          }
          
          .tab-button {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .tab-button:hover:not(.active) {
            transform: translateY(-2px);
          }
          
          .tab-button.active {
            box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
          }
          
          .payment-method {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .payment-method:hover {
            transform: translateY(-2px);
          }
          
          .payment-method.selected {
            animation: bounce-subtle 0.5s ease-in-out;
          }
          
          .payment-icon {
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          
          .payment-method:hover .payment-icon {
            transform: scale(1.1);
          }
          
          .modal-overlay {
            animation: fadeInUp 0.3s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          }
          
          .modal-content {
            animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          
          .bell-ring {
            animation: ring 2s ease-in-out infinite;
          }
          
          .group-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .group-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
          }
          
          .roommate-status {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .roommate-status:hover {
            transform: scale(1.05);
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <section className="bg-gradient-to-br from-forest-dark via-forest-main to-forest-light py-12 sm:py-16 lg:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in-down">
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              Split Bills & <span className="text-gold">Never Forget</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto px-4">
              Kelola tagihan bersama dengan mudah dan dapatkan reminder otomatis
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card bg-white rounded-2xl p-4 sm:p-6 shadow-xl stagger-item"
                style={{ animationDelay: prefersReducedMotion ? "0s" : `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div
                    className={`stat-icon w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}
                  >
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mb-2">
                  {stat.label}
                </div>
                <div className="text-xs text-green-600 font-medium">
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 animate-fade-in-up">
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    Tagihan Bulanan
                  </h2>
                  <p className="text-gray-600">November 2025</p>
                </div>
                <button
                  onClick={() => setShowAddBill(true)}
                  className="button-interactive inline-flex items-center justify-center gap-2 bg-gradient-to-r from-forest-main to-forest-light hover:from-forest-dark hover:to-forest-main text-white px-4 sm:px-6 py-3 rounded-xl font-bold shadow-xl w-full sm:w-auto"
                >
                  <Plus className="w-5 h-5" />
                  Tambah Tagihan
                </button>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide animate-fade-in-up" style={{ animationDelay: prefersReducedMotion ? "0s" : "0.1s" }}>
                {[
                  { id: "current", label: "Tagihan Aktif (4)" },
                  { id: "pending", label: "Belum Bayar (2)" },
                  { id: "paid", label: "Sudah Bayar (2)" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`tab-button px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-forest-main text-white active"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {currentBills
                  .filter((bill) => {
                    if (activeTab === "pending")
                      return bill.status === "pending";
                    if (activeTab === "paid") return bill.status === "paid";
                    return true;
                  })
                  .map((bill, index) => {
                    const daysUntil = getDaysUntil(bill.dueDate);
                    const isUrgent =
                      daysUntil <= 3 && bill.status === "pending";

                    return (
                      <div
                        key={`${activeTab}-${bill.id}`}
                        className={`bill-card bill-animate bg-white rounded-2xl p-4 sm:p-6 shadow-md border-2 ${
                          isUrgent
                            ? "border-red-300 bg-red-50 urgent"
                            : bill.status === "paid"
                              ? "border-green-200 bg-green-50"
                              : "border-gray-200"
                        }`}
                        style={{ animationDelay: prefersReducedMotion ? "0s" : `${index * 0.1}s` }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className="bill-icon text-3xl sm:text-4xl lg:text-5xl">
                              {bill.icon}
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 text-base sm:text-lg lg:text-xl mb-1">
                                {bill.name}
                              </h3>
                              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                                <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>Split {bill.splitCount} orang</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-1 sm:gap-2">
                            <button className="button-interactive p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg">
                              <Edit className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                            </button>
                            <button className="button-interactive p-1.5 sm:p-2 hover:bg-red-50 rounded-lg">
                              <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4 p-3 sm:p-4 bg-gray-50 rounded-xl transition-colors duration-300 hover:bg-gray-100">
                          <div>
                            <div className="text-[10px] sm:text-xs text-gray-600 mb-1">
                              Total Tagihan
                            </div>
                            <div className="font-bold text-gray-900 text-sm sm:text-base">
                              Rp {(bill.totalAmount / 1000).toFixed(0)}rb
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] sm:text-xs text-gray-600 mb-1">
                              Bagian Kamu
                            </div>
                            <div className="font-bold text-gold text-sm sm:text-base">
                              Rp {(bill.yourShare / 1000).toFixed(0)}rb
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] sm:text-xs text-gray-600 mb-1">
                              Jatuh Tempo
                            </div>
                            <div
                              className={`font-bold text-sm sm:text-base ${
                                isUrgent ? "text-red-600" : "text-gray-900"
                              }`}
                            >
                              {daysUntil > 0
                                ? `${daysUntil} hari`
                                : daysUntil === 0
                                  ? "Hari ini"
                                  : "Terlambat"}
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs sm:text-sm text-gray-600">
                              Status Pembayaran
                            </span>
                            <span className="text-xs sm:text-sm font-semibold text-gray-900">
                              {bill.paidBy.length}/{bill.splitCount} sudah bayar
                            </span>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            {roommates.map((roommate) => {
                              const hasPaid = bill.paidBy.includes(
                                roommate.name,
                              );
                              return (
                                <div
                                  key={roommate.name}
                                  className={`roommate-status text-center p-2 rounded-lg ${
                                    hasPaid
                                      ? "bg-green-100 border-2 border-green-400"
                                      : "bg-gray-100 border-2 border-gray-300"
                                  }`}
                                >
                                  <div
                                    className={`avatar-bounce w-6 h-6 sm:w-8 sm:h-8 rounded-full ${roommate.color} text-white flex items-center justify-center text-[10px] sm:text-xs font-bold mx-auto mb-1`}
                                  >
                                    {roommate.avatar}
                                  </div>
                                  <div className="text-[10px] sm:text-xs font-medium text-gray-700 truncate">
                                    {roommate.name}
                                  </div>
                                  {hasPaid && (
                                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 mx-auto mt-1" />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {bill.status === "pending" &&
                          bill.unpaidBy.includes("You") && (
                            <button
                              onClick={() => handlePayNow(bill)}
                              className="button-interactive w-full bg-gradient-to-r from-forest-main to-forest-light hover:from-forest-dark hover:to-forest-main text-white py-2.5 sm:py-3 rounded-xl font-bold flex items-center justify-center gap-2 text-sm sm:text-base"
                            >
                              <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                              Bayar Sekarang - Rp{" "}
                              {(bill.yourShare / 1000).toFixed(0)}rb
                            </button>
                          )}

                        {bill.status === "paid" && (
                          <div className="w-full bg-green-100 border-2 border-green-400 text-green-700 py-2.5 sm:py-3 rounded-xl font-bold text-center flex items-center justify-center gap-2 text-sm sm:text-base">
                            <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                            Lunas - Dibayar semua
                          </div>
                        )}
                      </div>
                    );
                  })}
                
                {/* Show empty state if no bills */}
                {currentBills.filter((bill) => {
                  if (activeTab === "pending") return bill.status === "pending";
                  if (activeTab === "paid") return bill.status === "paid";
                  return true;
                }).length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    Tidak ada tagihan
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border-2 border-gray-200 animate-fade-in-right" style={{ animationDelay: prefersReducedMotion ? "0s" : "0.2s" }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg flex items-center gap-2">
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gold bell-ring" />
                    Reminder Aktif
                  </h3>
                  <span className="bg-red-100 text-red-600 px-2 sm:px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                    {upcomingReminders.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {upcomingReminders.map((reminder, index) => (
                    <div
                      key={reminder.id}
                      className={`reminder-card p-3 sm:p-4 rounded-xl border-2 stagger-item ${
                        reminder.type === "urgent"
                          ? "bg-red-50 border-red-300 urgent"
                          : "bg-gray-50 border-gray-200"
                      }`}
                      style={{ animationDelay: prefersReducedMotion ? "0s" : `${0.3 + index * 0.1}s` }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-xs sm:text-sm mb-1">
                            {reminder.title}
                          </h4>
                          <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-600">
                            <Calendar className="w-3 h-3" />
                            <span>{reminder.date}</span>
                            <Clock className="w-3 h-3" />
                            <span>{reminder.time}</span>
                          </div>
                        </div>
                        {reminder.type === "urgent" && (
                          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0 animate-pulse" />
                        )}
                      </div>
                      <div className="font-bold text-gold text-xs sm:text-sm">
                        Rp {(reminder.amount / 1000).toFixed(0)}rb
                      </div>
                    </div>
                  ))}
                </div>

                <button className="button-interactive w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium text-xs sm:text-sm">
                  Lihat Semua Reminder
                </button>
              </div>

              <div className="group-card bg-gradient-to-br from-forest-main to-forest-light rounded-2xl p-4 sm:p-6 text-white shadow-xl animate-fade-in-right" style={{ animationDelay: prefersReducedMotion ? "0s" : "0.4s" }}>
                <h3 className="font-bold text-lg sm:text-xl mb-4">
                  Kelola Grup
                </h3>
                <div className="flex -space-x-2 mb-4">
                  {roommates.map((roommate, index) => (
                    <div
                      key={roommate.name}
                      className={`avatar-bounce w-8 h-8 sm:w-10 sm:h-10 rounded-full ${roommate.color} border-2 border-white flex items-center justify-center text-xs sm:text-sm font-bold stagger-item`}
                      style={{ animationDelay: prefersReducedMotion ? "0s" : `${0.5 + index * 0.1}s` }}
                    >
                      {roommate.avatar}
                    </div>
                  ))}
                </div>
                <p className="text-white/90 text-xs sm:text-sm mb-4">
                  {roommates.length} anggota dalam grup
                </p>
                <button className="button-interactive w-full bg-white text-forest-main py-2 rounded-lg font-bold text-xs sm:text-sm hover:bg-gray-100 flex items-center justify-center gap-2">
                  <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                  Undang Anggota
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showPayment && selectedBill && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-overlay">
          <div className="modal-content bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Pilih Metode Pembayaran
              </h3>
              <button
                onClick={() => {
                  setShowPayment(false);
                  setSelectedPaymentMethod(null);
                }}
                className="button-interactive text-gray-400 hover:text-gray-600 hover:rotate-90 transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 mb-6 stagger-item" style={{ animationDelay: prefersReducedMotion ? "0s" : "0.1s" }}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600 mb-1">
                    Total Pembayaran
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-gold">
                    Rp {selectedBill.yourShare.toLocaleString("id-ID")}
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl bill-icon">{selectedBill.icon}</div>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Tagihan {selectedBill.name} - Split {selectedBill.splitCount}{" "}
                orang
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {paymentMethods.map((method, index) => (
                <button
                  key={method.id}
                  onClick={() => handlePaymentMethodSelect(method)}
                  className={`payment-method w-full p-4 rounded-xl border-2 text-left stagger-item ${
                    selectedPaymentMethod?.id === method.id
                      ? "border-forest-main bg-forest-main/5 selected"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                  style={{ animationDelay: prefersReducedMotion ? "0s" : `${0.15 + index * 0.05}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`payment-icon w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}
                    >
                      {method.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900 mb-1">
                        {method.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {method.description}
                      </div>
                    </div>
                    {selectedPaymentMethod?.id === method.id && (
                      <Check className="w-6 h-6 text-forest-main flex-shrink-0 animate-scale-in" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleConfirmPayment}
              disabled={!selectedPaymentMethod}
              className={`button-interactive w-full py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg stagger-item ${
                selectedPaymentMethod
                  ? "bg-gradient-to-r from-forest-main to-forest-light text-white hover:shadow-xl"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              style={{ animationDelay: prefersReducedMotion ? "0s" : "0.4s" }}
            >
              {selectedPaymentMethod
                ? `Bayar dengan ${selectedPaymentMethod.name}`
                : "Pilih Metode Pembayaran"}
            </button>
          </div>
        </div>
      )}

      {showAddBill && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-overlay">
          <div className="modal-content bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Tambah Tagihan Baru
              </h3>
              <button
                onClick={() => setShowAddBill(false)}
                className="button-interactive text-gray-400 hover:text-gray-600 hover:rotate-90 transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Tagihan
                </label>
                <input
                  type="text"
                  placeholder="e.g. Listrik, Air, WiFi"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-forest-main text-sm sm:text-base transition-colors duration-300 hover:border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Amount
                </label>
                <input
                  type="number"
                  placeholder="500000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-forest-main text-sm sm:text-base transition-colors duration-300 hover:border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Jumlah Orang
                </label>
                <input
                  type="number"
                  placeholder="4"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-forest-main text-sm sm:text-base transition-colors duration-300 hover:border-gray-300"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Jatuh Tempo
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-forest-main text-sm sm:text-base transition-colors duration-300 hover:border-gray-300"
                />
              </div>

              <button
                type="submit"
                className="button-interactive w-full bg-gradient-to-r from-forest-main to-forest-light text-white py-3 rounded-xl font-bold hover:shadow-xl text-sm sm:text-base"
              >
                Tambah Tagihan
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="h-16 sm:h-0"></div>
    </div>
  );
}
