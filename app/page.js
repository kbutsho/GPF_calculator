"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

function InterestCalculator() {
  const [year, setYear] = useState("");
  const [prevBalance, setPrevBalance] = useState("");
  const [monthlySubs, setMonthlySubs] = useState("");
  const [finalAmount, setFinalAmount] = useState(null);
  const [history, setHistory] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const [lastCalculatedYear, setLastCalculatedYear] = useState("");


  // Interest Rates
  const [slab1Rate, setSlab1Rate] = useState(13);
  const [slab2Rate, setSlab2Rate] = useState(12);
  const [slab3Rate, setSlab3Rate] = useState(11);
  const [monthlyRate, setMonthlyRate] = useState(8.5);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("interestHistory") || "[]");
    setHistory(data);
  }, []);

  const calculateFinalAmount = () => {
    const prev = parseFloat(prevBalance);
    const subs = parseFloat(monthlySubs);
    const yearTrimmed = year.trim();

    if (
      isNaN(prev) ||
      isNaN(subs) ||
      prev < 0 ||
      subs < 0 ||
      !yearTrimmed.match(/^\d{4}-\d{4}$/)
    ) {
      toast.error("enter valid input")
      return;
    }
    console.log(yearTrimmed)
    const s1 = slab1Rate / 100;
    const s2 = slab2Rate / 100;
    const s3 = slab3Rate / 100;
    const mRate = monthlyRate / 100;

    const slabBreakdown = {};
    if (prev <= 1500000) {
      slabBreakdown.slab1 = {
        principal: prev,
        interest: prev * s1,
        total: prev + prev * s1,
        rate: slab1Rate,
      };
    } else if (prev <= 3000000) {
      slabBreakdown.slab1 = {
        principal: 1500000,
        interest: 1500000 * s1,
        total: 1500000 + 1500000 * s1,
        rate: slab1Rate,
      };
      const remaining = prev - 1500000;
      slabBreakdown.slab2 = {
        principal: remaining,
        interest: remaining * s2,
        total: remaining + remaining * s2,
        rate: slab2Rate,
      };
    } else {
      slabBreakdown.slab1 = {
        principal: 1500000,
        interest: 1500000 * s1,
        total: 1500000 + 1500000 * s1,
        rate: slab1Rate,
      };
      slabBreakdown.slab2 = {
        principal: 1500000,
        interest: 1500000 * s2,
        total: 1500000 + 1500000 * s2,
        rate: slab2Rate,
      };
      const remaining = prev - 3000000;
      slabBreakdown.slab3 = {
        principal: remaining,
        interest: remaining * s3,
        total: remaining + remaining * s3,
        rate: slab3Rate,
      };
    }

    const monthlyPrincipal = subs;
    const monthlyInterest = subs * mRate;
    const monthlyTotal = monthlyPrincipal + monthlyInterest;

    const slabTotal = Object.values(slabBreakdown).reduce(
      (acc, v) => acc + v.total,
      0
    );

    const subtotal = slabTotal + monthlyTotal;
    const rounded = parseFloat(subtotal.toFixed(2));
    setFinalAmount(rounded);

    const newEntry = {
      year: yearTrimmed,
      prevBalance: prev,
      monthlySubs: subs,
      total: rounded,
      breakdown: {
        slabs: slabBreakdown,
        monthly: {
          principal: monthlyPrincipal,
          interest: monthlyInterest,
          total: monthlyTotal,
          rate: monthlyRate,
        },
        subtotal,
      },
    };

    const updatedHistory = [...history, newEntry];
    localStorage.setItem("interestHistory", JSON.stringify(updatedHistory));
    setHistory(updatedHistory);

    setLastCalculatedYear(yearTrimmed);
    setYear("");
    setPrevBalance("");
    setMonthlySubs("");
  };

  const resetHistory = () => {
    localStorage.removeItem("interestHistory");
    setHistory([]);
    setFinalAmount(null);
  };

  const toggleRow = (index) => {
    setExpandedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const deleteEntry = (index) => {
    const updated = [...history];
    updated.splice(index, 1);
    setHistory(updated);
    localStorage.setItem("interestHistory", JSON.stringify(updated));
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h3 className="card-title text-center mb-4 fw-bold text-uppercase">💰 GPF Calculator</h3>

          {/* Inputs Row in 1 line */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label"><small>Year</small></label>
              <input
                required
                type="text"
                className="form-control"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder={`${new Date().getFullYear()}-${new Date().getFullYear() + 1}`}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label"><small>Previous Balance (BDT)</small></label>
              <input
                type="number"
                className="form-control"
                value={prevBalance}
                onChange={(e) => setPrevBalance(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label"><small>Monthly Subscription (BDT)</small></label>
              <input
                required
                type="number"
                className="form-control"
                value={monthlySubs}
                onChange={(e) => setMonthlySubs(e.target.value)}
              />
            </div>
          </div>

          {/* Interest Rates */}
          <div className="row">
            <div className="col-md-3 mb-3">
              <label className="form-label"><small>First slab interest rate (%)</small></label>
              <input
                required
                type="number"
                className="form-control"
                value={slab1Rate}
                onChange={(e) => setSlab1Rate(e.target.value)}
              />
              <small>(up to 15,00,000 BDT)</small>
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label"><small>Second slab interest rate (%)</small></label>
              <input
                required
                type="number"
                className="form-control"
                value={slab2Rate}
                onChange={(e) => setSlab2Rate(e.target.value)}
              />
              <small>(15,00,001 BDT to 30,00,000 BDT)</small>
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label"><small>Third slab 3 interest rate (%)</small></label>
              <input
                type="number"
                className="form-control"
                value={slab3Rate}
                onChange={(e) => setSlab3Rate(e.target.value)}
              />
              <small>(above 30,00,000 BDT)</small>
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label"><small>Monthly Subscription interest rate (%)</small></label>
              <input
                type="number"
                className="form-control"
                value={monthlyRate}
                onChange={(e) => setMonthlyRate(e.target.value)}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex gap-2 mb-3">
            <button className="btn btn-primary w-100" onClick={calculateFinalAmount}>
              Calculate
            </button>
            <button className="btn btn-danger w-100" onClick={resetHistory}>
              🔁 Reset All
            </button>
          </div>

          {/* Final Amount */}
          {finalAmount !== null && (
            <div className="alert mt-4">
              <h5 className="fw-bold">closing balance ({lastCalculatedYear})</h5>

              <p><strong>Total with Interest {finalAmount} BDT</strong></p>
            </div>
          )}
        </div>
      </div>

      {/* History Table */}
      {history.length > 0 && (
        <div className="mt-5">
          <h4 className="mb-3 text-center">📊 Yearly Calculation History</h4>
          <table className="table table-bordered text-center">
            <thead className="table-secondary">
              <tr>
                <th>Year</th>
                <th>Previous Balance (Tk)</th>
                <th>Monthly Subscription (Tk)</th>
                <th>Total (Tk)</th>
                <th>🗑️</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, index) => (
                <React.Fragment key={index}>
                  <tr
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleRow(index)}
                  >
                    <td>{entry.year}</td>
                    <td>{entry.prevBalance.toLocaleString()}</td>
                    <td>{entry.monthlySubs.toLocaleString()}</td>
                    <td>{entry.total.toLocaleString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteEntry(index);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  {expandedRows[index] && (
                    <tr>
                      <td colSpan="5" className="text-start bg-light">
                        <strong>Breakdown:</strong>
                        <div className="table-responsive mt-2">
                          <table className="table table-sm table-bordered text-center">
                            <thead className="table-light">
                              <tr>
                                <th>Type</th>
                                <th>Principal (Tk)</th>
                                <th>Interest (Tk)</th>
                                <th>Interest %</th>
                                <th>Total (Tk)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.entries(entry.breakdown.slabs).map(([key, slab], idx) => (
                                <tr key={key}>
                                  <td>Slab {idx + 1}</td>
                                  <td>{slab.principal.toLocaleString()}</td>
                                  <td>{slab.interest.toLocaleString()}</td>
                                  <td>{slab.rate}%</td>
                                  <td>{slab.total.toLocaleString()}</td>
                                </tr>
                              ))}
                              <tr>
                                <td>Monthly</td>
                                <td>{entry.breakdown.monthly.principal.toLocaleString()}</td>
                                <td>{entry.breakdown.monthly.interest.toLocaleString()}</td>
                                <td>{entry.breakdown.monthly.rate}%</td>
                                <td>{entry.breakdown.monthly.total.toLocaleString()}</td>
                              </tr>
                              <tr className="table-info fw-bold">
                                <td colSpan="4">closing balance ({entry.year})</td>
                                <td>{entry.breakdown.subtotal.toLocaleString()}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <p className="text-muted text-center fst-italic">
            * Click a year to toggle interest breakdown. Use 🗑️ to delete entry.
          </p>
        </div>
      )}
    </div>
  );
}

export default InterestCalculator;
