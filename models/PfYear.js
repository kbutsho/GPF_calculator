import mongoose from "mongoose";
import { RateModes, DepositMethods, Rounding } from "@/lib/constants";

const SlabSchema = new mongoose.Schema(
  {
    // Band SIZE, not a cumulative ceiling. null means "all the rest".
    upTo: { type: Number, default: null },
    rate: { type: Number, required: true },
  },
  { _id: false }
);

const MonthSchema = new mongoose.Schema(
  {
    index: { type: Number, required: true }, // 0 = July ... 11 = June
    subscription: { type: Number, default: 0 },
    refund: { type: Number, default: 0 },
    withdrawal: { type: Number, default: 0 },
  },
  { _id: false }
);

const PfYearSchema = new mongoose.Schema(
  {
    // Owner. Every query is scoped by it, so users never see each other's years.
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subscriber: { type: String, trim: true, default: "" },
    accountNo: { type: String, trim: true, default: "" },
    // Fiscal year is July <startYear> to June <startYear + 1>.
    startYear: { type: Number, required: true },
    openingBalance: { type: Number, default: 0 },
    slabs: { type: [SlabSchema], default: undefined },
    rateMode: { type: String, enum: Object.values(RateModes), default: RateModes.TOP_SLAB },
    depositRate: { type: Number, default: 0 },
    depositMethod: {
      type: String,
      enum: Object.values(DepositMethods),
      default: DepositMethods.MONTHWISE,
    },
    rounding: { type: String, enum: Object.values(Rounding), default: Rounding.TRUNCATE },
    months: { type: [MonthSchema], default: [] },
    // What the official statement printed, for reconciliation. Blank = skip.
    reportedProfit: { type: Number, default: null },
    reportedClosing: { type: Number, default: null },
    note: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

PfYearSchema.index({ userId: 1, startYear: -1 });

export default mongoose.models.PfYear || mongoose.model("PfYear", PfYearSchema, "pf_years");
