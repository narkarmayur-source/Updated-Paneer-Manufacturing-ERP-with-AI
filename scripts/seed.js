/**
 * Initial Seed Script for Phaltan Paneer Plant ERP
 */

console.log("Seeding Phaltan Paneer Plant ERP initial database...");

const initialSuppliers = [
  { code: "SUP-01", name: "Barad Dairy Farmer Producer Co.", type: "FPC", village: "Barad", phone: "+91 98221 11223", baseFat: 5.60, baseSNF: 1.55 },
  { code: "SUP-02", name: "Taradgaon Bulk Milk Chilling Center", type: "BMC", village: "Taradgaon", phone: "+91 98221 22334", baseFat: 5.60, baseSNF: 1.55 },
  { code: "SUP-03", name: "Lonand Dairy Cooperative Hub", type: "COOPERATIVE", village: "Lonand", phone: "+91 98221 33445", baseFat: 5.60, baseSNF: 1.55 },
  { code: "SUP-04", name: "Phaltan Rural Farmer Collection Group", type: "INDIVIDUAL_FARMERS", village: "Phaltan Rural", phone: "+91 98221 44556", baseFat: 5.60, baseSNF: 1.55 }
];

const initialCustomers = [
  { code: "CUST-01", name: "Hotel Rajwada & Banquet Hall", city: "Satara City", route: "ROUTE_BETA_SATARA_SHIRWAL", creditDays: 14, limit: 75000 },
  { code: "CUST-02", name: "Nisarg Forest Resort & Spa", city: "Wai", route: "ROUTE_GAMMA_WAI_MAHABALESHWAR", creditDays: 7, limit: 50000 },
  { code: "CUST-03", name: "Mahabaleshwar Heritage Club", city: "Mahabaleshwar", route: "ROUTE_GAMMA_WAI_MAHABALESHWAR", creditDays: 7, limit: 100000 },
  { code: "CUST-04", name: "Baramati Highway Dhaba Association", city: "Baramati", route: "ROUTE_ALPHA_BARAMATI", creditDays: 7, limit: 60000 },
  { code: "CUST-05", name: "Phaltan Fresh Dairy & Sweet Mart", city: "Phaltan", route: "ROUTE_LOCAL_PHALTAN", creditDays: 3, limit: 25000 }
];

const initialInventory = [
  { sku: "RM-CITRIC-01", name: "Food Grade Citric Acid Monohydrate", category: "RAW_MATERIAL", stock: 250, unit: "KG", reorder: 50, cost: 140 },
  { sku: "PKG-VAC-1KG", name: "Multi-layer High Barrier Vacuum Pouch (1kg)", category: "PACKAGING", stock: 5000, unit: "NOS", reorder: 1000, cost: 4.50 },
  { sku: "PKG-VAC-200G", name: "Branded Stand-up Vacuum Pouch (200g)", category: "PACKAGING", stock: 8000, unit: "NOS", reorder: 2000, cost: 2.80 },
  { sku: "FL-BRIQUETTE", name: "Compressed Agricultural Biomass Briquettes", category: "CONSUMABLE", stock: 4000, unit: "KG", reorder: 1000, cost: 6.50 },
  { sku: "FG-PANEER-1KG", name: "Fresh Vacuum Packed Paneer 1kg Block", category: "FINISHED_GOODS", stock: 180, unit: "KG", reorder: 50, cost: 288.54 }
];

console.log("Suppliers Seeded:", initialSuppliers.length);
console.log("Customers Seeded:", initialCustomers.length);
console.log("Inventory Items Seeded:", initialInventory.length);
console.log("Database seeded successfully for commercial plant operations.");
