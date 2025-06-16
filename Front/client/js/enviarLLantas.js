
import fetch from 'node-fetch';

const llantas = [
  {
    "type": "neumatico",
    "marca": "Michelin",
    "modelo": "Primacy 4",
    "medida": "217/60 R18",
    "precio": 352621.92,
    "tecnologia": "Urbano",
    "stock": "En stock",
    "activo": "66a22858-b5f7-41b5-9ae9-c1b1336d08d6",
    "nombre": "Michelin Primacy 4 217/60 R18"
  },
  {
    "type": "neumatico",
    "marca": "Pirelli",
    "modelo": "Cinturato P7",
    "medida": "205/55 R16",
    "precio": 289000.50,
    "tecnologia": "Carretera",
    "stock": "En stock",
    "activo": "7bca72fa-e4bb-421e-a273-b327130cdb47",
    "nombre": "Pirelli Cinturato P7 205/55 R16"
  },
  {
    "type": "neumatico",
    "marca": "Bridgestone",
    "modelo": "Turanza T005",
    "medida": "225/45 R17",
    "precio": 310500.00,
    "tecnologia": "Turismo",
    "stock": "Sin stock",
    "activo": "f35c7e31-5f43-4cdd-bb09-1e4cf0939b0e",
    "nombre": "Bridgestone Turanza T005 225/45 R17"
  },
  {
    "type": "neumatico",
    "marca": "Continental",
    "modelo": "EcoContact 6",
    "medida": "195/65 R15",
    "precio": 270000.75,
    "tecnologia": "Ecológico",
    "stock": "En stock",
    "activo": "6d29fafd-2182-47e4-899d-3bc70890cf3a",
    "nombre": "Continental EcoContact 6 195/65 R15"
  },
  {
    "type": "neumatico",
    "marca": "Goodyear",
    "modelo": "Eagle F1 Asymmetric 5",
    "medida": "245/40 R18",
    "precio": 399999.90,
    "tecnologia": "Alto rendimiento",
    "stock": "En stock",
    "activo": "c6b30841-f2d5-442e-b89c-67b6b03268a1",
    "nombre": "Goodyear Eagle F1 Asymmetric 5 245/40 R18"
  },
  {
    "type": "neumatico",
    "marca": "Dunlop",
    "modelo": "Sport Maxx RT2",
    "medida": "225/40 R18",
    "precio": 375420.60,
    "tecnologia": "Deportivo",
    "stock": "Sin stock",
    "activo": "29489101-c44e-419f-9a67-b28b3ac84b83",
    "nombre": "Dunlop Sport Maxx RT2 225/40 R18"
  },
  {
    "type": "neumatico",
    "marca": "Firestone",
    "modelo": "Multihawk 2",
    "medida": "175/65 R14",
    "precio": 198500.00,
    "tecnologia": "Económico",
    "stock": "En stock",
    "activo": "f93b5e77-4ed9-465e-b215-179bde527e0a",
    "nombre": "Firestone Multihawk 2 175/65 R14"
  },
  {
    "type": "neumatico",
    "marca": "Hankook",
    "modelo": "Ventus Prime3",
    "medida": "215/55 R17",
    "precio": 309980.20,
    "tecnologia": "Touring",
    "stock": "En stock",
    "activo": "6c98c13a-b0cd-4fcb-8e3d-7505d7d94c31",
    "nombre": "Hankook Ventus Prime3 215/55 R17"
  },
  {
    "type": "neumatico",
    "marca": "Kumho",
    "modelo": "Ecsta PS71",
    "medida": "235/45 R18",
    "precio": 348200.40,
    "tecnologia": "Alto rendimiento",
    "stock": "Sin stock",
    "activo": "77d813b5-fbc2-4df0-99fc-60ec23594233",
    "nombre": "Kumho Ecsta PS71 235/45 R18"
  },
  {
    "type": "neumatico",
    "marca": "Nokian",
    "modelo": "Wetproof",
    "medida": "205/55 R16",
    "precio": 287600.00,
    "tecnologia": "Lluvia",
    "stock": "En stock",
    "activo": "e00497a3-2495-4387-a973-1407ebc5d56b",
    "nombre": "Nokian Wetproof 205/55 R16"
  },
  {
    "type": "neumatico",
    "marca": "Yokohama",
    "modelo": "BluEarth AE-50",
    "medida": "205/60 R16",
    "precio": 299500.75,
    "tecnologia": "Ecológico",
    "stock": "En stock",
    "activo": "a1c5e7d8-f432-4b90-bd4f-cfbf2a28f7e1",
    "nombre": "Yokohama BluEarth AE-50 205/60 R16"
  },
  {
    "type": "neumatico",
    "marca": "Falken",
    "modelo": "Azenis FK510",
    "medida": "225/40 R18",
    "precio": 360100.20,
    "tecnologia": "Deportivo",
    "stock": "En stock",
    "activo": "b2d37819-8f44-4f6c-b9c4-cd0a27e9b71a",
    "nombre": "Falken Azenis FK510 225/40 R18"
  },
  {
    "type": "neumatico",
    "marca": "General Tire",
    "modelo": "Grabber HTS60",
    "medida": "265/70 R16",
    "precio": 385000.00,
    "tecnologia": "Todo terreno",
    "stock": "En stock",
    "activo": "d2f483e0-7c5e-4a9d-8a3f-347e6a945c11",
    "nombre": "General Tire Grabber HTS60 265/70 R16"
  },
  {
    "type": "neumatico",
    "marca": "Cooper",
    "modelo": "Discoverer AT3",
    "medida": "275/65 R17",
    "precio": 410000.40,
    "tecnologia": "Todo terreno",
    "stock": "Sin stock",
    "activo": "c3e18d5f-3c1a-4d49-8ae5-1d23e96f72d3",
    "nombre": "Cooper Discoverer AT3 275/65 R17"
  },
  {
    "type": "neumatico",
    "marca": "Toyo",
    "modelo": "Proxes R46",
    "medida": "215/50 R17",
    "precio": 320450.85,
    "tecnologia": "Alto rendimiento",
    "stock": "En stock",
    "activo": "f819a417-7e9b-4b2b-a8ec-cbbf1a1e3a22",
    "nombre": "Toyo Proxes R46 215/50 R17"
  },
  {
    "type": "neumatico",
    "marca": "Sumitomo",
    "modelo": "Htr Enhance LX2",
    "medida": "225/55 R17",
    "precio": 298750.10,
    "tecnologia": "Touring",
    "stock": "En stock",
    "activo": "e47a2d59-3c6d-4e07-bb4e-f1288d6b42d5",
    "nombre": "Sumitomo Htr Enhance LX2 225/55 R17"
  },
  {
    "type": "neumatico",
    "marca": "Nitto",
    "modelo": "NT421Q",
    "medida": "305/35 R20",
    "precio": 450000.00,
    "tecnologia": "Ultra alto rendimiento",
    "stock": "Sin stock",
    "activo": "a9d7e8c6-f531-4df0-a74b-8d8ee7a2a395",
    "nombre": "Nitto NT421Q 305/35 R20"
  },
  {
    "type": "neumatico",
    "marca": "BFGoodrich",
    "modelo": "All-Terrain T/A KO2",
    "medida": "265/70 R17",
    "precio": 420300.25,
    "tecnologia": "Todo terreno",
    "stock": "En stock",
    "activo": "be3c5e11-c38a-4b47-b07a-97e7c0b6c01a",
    "nombre": "BFGoodrich All-Terrain T/A KO2 265/70 R17"
  },
  {
    "type": "neumatico",
    "marca": "Maxxis",
    "modelo": "Premitra HP5",
    "medida": "215/55 R17",
    "precio": 275400.00,
    "tecnologia": "Touring",
    "stock": "En stock",
    "activo": "d06a2797-1f3b-45d7-8b6a-40d71e4c5d11",
    "nombre": "Maxxis Premitra HP5 215/55 R17"
  },
  {
    "type": "neumatico",
    "marca": "Hifly",
    "modelo": "HF201",
    "medida": "195/65 R15",
    "precio": 220500.55,
    "tecnologia": "Económico",
    "stock": "En stock",
    "activo": "f42b1e72-b09d-4c4e-a51a-283bcb1456f8",
    "nombre": "Hifly HF201 195/65 R15"
  },
  {
    "type": "neumatico",
    "marca": "Vredestein",
    "modelo": "Ultrac Vorti R",
    "medida": "225/50 R17",
    "precio": 335700.80,
    "tecnologia": "Alto rendimiento",
    "stock": "En stock",
    "activo": "1e2f4a90-5cdb-4a0d-bbd0-fd937e1b5a07",
    "nombre": "Vredestein Ultrac Vorti R 225/50 R17"
  },
  {
    "type": "neumatico",
    "marca": "Uniroyal",
    "modelo": "RainExpert 3",
    "medida": "195/65 R15",
    "precio": 245000.00,
    "tecnologia": "Lluvia",
    "stock": "En stock",
    "activo": "6f845ed7-9f56-4a1a-8e43-b9a34f6ca5f4",
    "nombre": "Uniroyal RainExpert 3 195/65 R15"
  },
  {
    "type": "neumatico",
    "marca": "Marshal",
    "modelo": "Road Venture MT51",
    "medida": "285/70 R17",
    "precio": 412500.50,
    "tecnologia": "Todo terreno",
    "stock": "Sin stock",
    "activo": "8d1c539a-b8f8-43ac-8048-3b25b0d5f1f2",
    "nombre": "Marshal Road Venture MT51 285/70 R17"
  },
  {
    "type": "neumatico",
    "marca": "Debica",
    "modelo": "Frigo 2",
    "medida": "185/65 R15",
    "precio": 198900.00,
    "tecnologia": "Invierno",
    "stock": "En stock",
    "activo": "ab3c1c72-23a8-4d3e-b2e8-2f5c4b19b1c4",
    "nombre": "Debica Frigo 2 185/65 R15"
  },
  {
    "type": "neumatico",
    "marca": "Nexen",
    "modelo": "N'Fera SU1",
    "medida": "225/45 R17",
    "precio": 310200.95,
    "tecnologia": "Alto rendimiento",
    "stock": "En stock",
    "activo": "c42a1f43-d9e5-408b-8f01-ea97a5f45e91",
    "nombre": "Nexen N'Fera SU1 225/45 R17"
  },
  {
    "type": "neumatico",
    "marca": "Kenda",
    "modelo": "Kenetica KR20",
    "medida": "195/60 R15",
    "precio": 210300.10,
    "tecnologia": "Económico",
    "stock": "En stock",
    "activo": "d12a7c58-ef23-4e37-b2bc-0d4f7b84c1f9",
    "nombre": "Kenda Kenetica KR20 195/60 R15"
  },
  {
    "type": "neumatico",
    "marca": "Westlake",
    "modelo": "RP18",
    "medida": "205/55 R16",
    "precio": 240000.00,
    "tecnologia": "Touring",
    "stock": "Sin stock",
    "activo": "e54c3a74-1f49-4a3a-b1f2-2c0b6cbd11bc",
    "nombre": "Westlake RP18 205/55 R16"
  },
  {
    "type": "neumatico",
    "marca": "Triangle",
    "modelo": "TR978",
    "medida": "215/60 R16",
    "precio": 278500.75,
    "tecnologia": "Ecológico",
    "stock": "En stock",
    "activo": "b785f7d8-2eb0-4c74-bb25-94e07e7b121a",
    "nombre": "Triangle TR978 215/60 R16"
  },
  {
    "type": "neumatico",
    "marca": "Petlas",
    "modelo": "Imperium PT515",
    "medida": "225/55 R17",
    "precio": 295000.00,
    "tecnologia": "Touring",
    "stock": "En stock",
    "activo": "c28b94e4-d1db-4b30-96c1-71e9d1c8e3e6",
    "nombre": "Petlas Imperium PT515 225/55 R17"
  },
  {
    "type": "neumatico",
    "marca": "Accelera",
    "modelo": "Phi",
    "medida": "195/55 R16",
    "precio": 212000.35,
    "tecnologia": "Económico",
    "stock": "En stock",
    "activo": "f92b3a11-7d45-4d9f-9c9c-96a75d1d2a3e",
    "nombre": "Accelera Phi 195/55 R16"
  },
  {
    "type": "neumatico",
    "marca": "Falken",
    "modelo": "Azenis FK510",
    "medida": "235/40 R18",
    "precio": 360500.00,
    "tecnologia": "Alto rendimiento",
    "stock": "En stock",
    "activo": "a1b2c3d4-5678-90ab-cdef-1234567890ab",
    "nombre": "Falken Azenis FK510 235/40 R18"
  },
  {
    "type": "neumatico",
    "marca": "Cooper",
    "modelo": "Zeon RS3-A",
    "medida": "225/50 R17",
    "precio": 299900.00,
    "tecnologia": "Touring",
    "stock": "En stock",
    "activo": "b2c3d4e5-6789-01bc-defa-2345678901bc",
    "nombre": "Cooper Zeon RS3-A 225/50 R17"
  },
  {
    "type": "neumatico",
    "marca": "Toyo",
    "modelo": "Proxes Sport",
    "medida": "245/40 R18",
    "precio": 385000.50,
    "tecnologia": "Deportivo",
    "stock": "Sin stock",
    "activo": "c3d4e5f6-7890-12cd-efab-3456789012cd",
    "nombre": "Toyo Proxes Sport 245/40 R18"
  },
  {
    "type": "neumatico",
    "marca": "Maxxis",
    "modelo": "Premitra HP5",
    "medida": "215/55 R17",
    "precio": 270500.00,
    "tecnologia": "Touring",
    "stock": "En stock",
    "activo": "d4e5f607-8901-23de-fabc-4567890123de",
    "nombre": "Maxxis Premitra HP5 215/55 R17"
  },
  {
    "type": "neumatico",
    "marca": "Sailun",
    "modelo": "Atrezzo ZSR",
    "medida": "205/55 R16",
    "precio": 230000.00,
    "tecnologia": "Económico",
    "stock": "En stock",
    "activo": "e5f60718-9012-34ef-abcd-5678901234ef",
    "nombre": "Sailun Atrezzo ZSR 205/55 R16"
  },
  {
    "type": "neumatico",
    "marca": "General Tire",
    "modelo": "Altimax RT43",
    "medida": "225/60 R16",
    "precio": 285000.75,
    "tecnologia": "Touring",
    "stock": "En stock",
    "activo": "f6071829-0123-45f0-bcde-6789012345f0",
    "nombre": "General Tire Altimax RT43 225/60 R16"
  },
  {
    "type": "neumatico",
    "marca": "Barum",
    "modelo": "Brillantis 5",
    "medida": "195/65 R15",
    "precio": 210000.40,
    "tecnologia": "Ecológico",
    "stock": "En stock",
    "activo": "07182930-1234-56a1-cdef-7890123456a1",
    "nombre": "Barum Brillantis 5 195/65 R15"
  },
  {
    "type": "neumatico",
    "marca": "Linglong",
    "modelo": "Green-Max",
    "medida": "215/60 R16",
    "precio": 220000.00,
    "tecnologia": "Ecológico",
    "stock": "Sin stock",
    "activo": "18293041-2345-67b2-def0-8901234567b2",
    "nombre": "Linglong Green-Max 215/60 R16"
  },
  {
    "type": "neumatico",
    "marca": "Infinity",
    "modelo": "ECO Plus",
    "medida": "205/55 R16",
    "precio": 215000.30,
    "tecnologia": "Económico",
    "stock": "En stock",
    "activo": "29304152-3456-78c3-ef01-9012345678c3",
    "nombre": "Infinity ECO Plus 205/55 R16"
  },
  {
    "type": "neumatico",
    "marca": "Atlas",
    "modelo": "Imperial X",
    "medida": "225/55 R17",
    "precio": 275000.00,
    "tecnologia": "Touring",
    "stock": "En stock",
    "activo": "30415263-4567-89d4-0123-4567890129d4",
    "nombre": "Atlas Imperial X 225/55 R17"
  },
  {
    "type": "neumatico",
    "marca": "Vredestein",
    "modelo": "Ultrac Vorti R",
    "medida": "225/40 R18",
    "precio": 372000.50,
    "tecnologia": "Alto rendimiento",
    "stock": "En stock",
    "activo": "41526374-5678-90e5-f012-5678901234e5",
    "nombre": "Vredestein Ultrac Vorti R 225/40 R18"
  },
  {
    "type": "neumatico",
    "marca": "Kenda",
    "modelo": "KR23",
    "medida": "185/65 R15",
    "precio": 195000.00,
    "tecnologia": "Económico",
    "stock": "En stock",
    "activo": "52637485-6789-01f6-0123-6789012345f6",
    "nombre": "Kenda KR23 185/65 R15"
  },
  {
    "type": "neumatico",
    "marca": "Nitto",
    "modelo": "NT555 G2",
    "medida": "255/40 R19",
    "precio": 420000.00,
    "tecnologia": "Deportivo",
    "stock": "Sin stock",
    "activo": "63748596-7890-12g7-1234-7890123456g7",
    "nombre": "Nitto NT555 G2 255/40 R19"
  },
  {
    "type": "neumatico",
    "marca": "Uniroyal",
    "modelo": "RainSport 3",
    "medida": "205/50 R17",
    "precio": 298000.00,
    "tecnologia": "Lluvia",
    "stock": "En stock",
    "activo": "74859607-8901-23h8-2345-8901234567h8",
    "nombre": "Uniroyal RainSport 3 205/50 R17"
  },
  {
    "type": "neumatico",
    "marca": "Federal",
    "modelo": "Couragia FX",
    "medida": "235/55 R18",
    "precio": 310000.50,
    "tecnologia": "Touring",
    "stock": "En stock",
    "activo": "85960718-9012-34i9-3456-9012345678i9",
    "nombre": "Federal Couragia FX 235/55 R18"
  },
  {
    "type": "neumatico",
    "marca": "Accelera",
    "modelo": "Phi",
    "medida": "215/45 R17",
    "precio": 265000.00,
    "tecnologia": "Deportivo",
    "stock": "Sin stock",
    "activo": "96071829-0123-45j0-4567-0123456789j0",
    "nombre": "Accelera Phi 215/45 R17"
  },
  {
    "type": "neumatico",
    "marca": "Debica",
    "modelo": "Frigo HP2",
    "medida": "195/65 R15",
    "precio": 250000.00,
    "tecnologia": "Invierno",
    "stock": "En stock",
    "activo": "07182930-1234-56k1-5678-1234567890k1",
    "nombre": "Debica Frigo HP2 195/65 R15"
  },
  {
    "type": "neumatico",
    "marca": "Laufenn",
    "modelo": "S Fit EQ",
    "medida": "205/55 R16",
    "precio": 240000.00,
    "tecnologia": "Ecológico",
    "stock": "En stock",
    "activo": "18293041-2345-67l2-6789-2345678901l2",
    "nombre": "Laufenn S Fit EQ 205/55 R16"
  },
  {
    "type": "neumatico",
    "marca": "Kumho",
    "modelo": "Crugen Premium",
    "medida": "235/65 R17",
    "precio": 330000.00,
    "tecnologia": "SUV",
    "stock": "En stock",
    "activo": "29304152-3456-78m3-7890-3456789012m3",
    "nombre": "Kumho Crugen Premium 235/65 R17"
  },
  {
    "type": "neumatico",
    "marca": "Yokohama",
    "modelo": "BluEarth AE-50",
    "medida": "215/60 R16",
    "precio": 295000.75,
    "tecnologia": "Ecológico",
    "stock": "En stock",
    "activo": "30415263-4567-89n4-8901-4567890123n4",
    "nombre": "Yokohama BluEarth AE-50 215/60 R16"
  }
];

llantas.forEach(async (data) => {
  const obj = {
    "type": data.type,
    "marca": data.marca,
    "modelo": data.modelo,
    "medida": data.medida,
    "precio": data.precio,
    "tecnologia": data.tecnologia,
    "stock": data.stock,
    "activo": data.activo,
    "nombre": data.nombre
  };

  console.log("Enviando", obj);

  try {
    const res = await fetch('http://localhost:5000/api/neumatico', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });

    const result = await res.json();
    console.log(`✔ Llanta ${obj.nombre} creada:`, result);
  } catch (err) {
    console.error(`❌ Error al enviar Llanta ${obj.nombre}:`, err.message);
  }
});
