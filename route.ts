import { NextResponse } from 'next/server';

let currentTelemetry = {
  coldRoom: {
    sensorId: "TEMP-CR-01",
    zone: "Finished Goods Cold Room (Target: 2°C - 4°C)",
    currentTempC: 3.2,
    setPointC: 3.0,
    humidityRh: 84.5,
    compressorStatus: "CYCLING_NORMAL",
    doorStatus: "CLOSED",
    alert: false,
    lastPing: new Date().toISOString()
  },
  chillingTank: {
    sensorId: "TEMP-CT-01",
    zone: "Raw Milk Chilling Tank (Target: 4°C)",
    currentTempC: 3.8,
    setPointC: 4.0,
    agitatorStatus: "ACTIVE",
    alert: false,
    lastPing: new Date().toISOString()
  },
  steamBoiler: {
    sensorId: "PRESS-BL-01",
    zone: "Agro-Briquette Steam Boiler",
    steamPressureBar: 4.2,
    targetPressureBar: 5.0,
    waterLevel: "NORMAL",
    flueGasTempC: 185.0,
    alert: false,
    lastPing: new Date().toISOString()
  },
  reeferVan: {
    sensorId: "GPS-VAN-01",
    zone: "Mahindra Bolero Insulated Delivery Van",
    currentTempC: 3.9,
    currentLocation: "Baramati Bypass (SH-147)",
    etaNextDropMin: 14,
    alert: false,
    lastPing: new Date().toISOString()
  }
};

export async function GET() {
  return NextResponse.json(currentTelemetry);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const zone = body.zone || "coldRoom";
    const temp = Number(body.temperatureC);

    if (zone === "coldRoom") {
      currentTelemetry.coldRoom.currentTempC = temp;
      currentTelemetry.coldRoom.lastPing = new Date().toISOString();
      if (temp > 5.5) {
        currentTelemetry.coldRoom.alert = true;
        // Simulating IoT trigger
        console.warn(`[IOT ALARM] Cold room temperature breach: ${temp}°C! Triggering SMS/WhatsApp to Plant Manager.`);
      } else {
        currentTelemetry.coldRoom.alert = false;
      }
    }

    return NextResponse.json({ success: true, telemetry: currentTelemetry });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
