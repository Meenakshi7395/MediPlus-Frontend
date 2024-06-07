const frequencyData = [
    { abbr: "QD", description: "Once a day", times: 1 },
    { abbr: "SID", description: "Once a day (veterinary usage)", times: 1 },
    { abbr: "BID", description: "Twice a day", times: 2 },
    { abbr: "TID", description: "Three times a day", times: 3 },
    { abbr: "QID", description: "Four times a day", times: 4 },
    { abbr: "QHS", description: "Every night at bedtime", times: 1 },
    { abbr: "HS", description: "At bedtime", times: 1 },
    { abbr: "PRN", description: "As needed", times: 0 },
    { abbr: "Q4H", description: "Every 4 hours", times: 6 },
    { abbr: "Q6H", description: "Every 6 hours", times: 4 },
    { abbr: "Q8H", description: "Every 8 hours", times: 3 },
    { abbr: "Q12H", description: "Every 12 hours", times: 2 },
    { abbr: "BIW", description: "Twice a week", times: 0.29 },
    { abbr: "TIW", description: "Three times a week", times: 0.43 },
    { abbr: "QW", description: "Once a week", times: 0.14 },
    { abbr: "QAM", description: "Every morning", times: 1 },
    { abbr: "QPM", description: "Every evening", times: 1 },
    { abbr: "QOD", description: "Every other day", times: 0.5 },
    { abbr: "Q3H", description: "Every 3 hours", times: 8 },
    { abbr: "Q2H", description: "Every 2 hours", times: 12 },
    { abbr: "Q1H", description: "Every hour", times: 24 }
  ];

  const medicineCategoryData = [
    { abbr: "TAB", description: "Tablet" },
    { abbr: "CAP", description: "Capsule" },
    { abbr: "SUSP", description: "Suspension" },
    { abbr: "SOL", description: "Solution" },
    { abbr: "INJ", description: "Injection" },
    { abbr: "CRM", description: "Cream" },
    { abbr: "UNG", description: "Ointment" },
    { abbr: "SYR", description: "Syrup" },
    { abbr: "GEL", description: "Gel" },
    { abbr: "LOT", description: "Lotion" },
    { abbr: "AER", description: "Aerosol" }
  ]

  const doctors = [
    { doctor: "Dr. Himanshu",title:"Physician",degree:"MBBS, M.D.",department:"General Medicine"},
    { doctor: "Dr. Rahul Sharma",title:"Neurologist",degree:"MBBS, M.D.",department:"General Medicine"},
    { doctor: "Dr. Meenakshi",title:"Cardiologist",degree:"MBBS, M.D.",department:"General Medicine"},
    { doctor: "Dr. Rohan Gupta",title:"Orthopedic",degree:"MBBS, M.D.",department:"General Medicine"},
    { doctor: "Dr. Reeta Sharma",title:"ENT",degree:"MBBS, M.D.",department:"General Medicine"}
    
  ]

export {frequencyData,medicineCategoryData,doctors}