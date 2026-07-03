console.info(
  "%c AIR QUALITY CARD  v1.1 ",
  "color: white; background: green; font-weight: bold;",
);

import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import { HomeAssistant } from "custom-card-helpers";
import { fireEvent } from "custom-card-helpers";
import "./air-quality-card-editor";

export type SensorType =
  // 1. Air Pollutants
  | "pm1"
  | "pm2_5"
  | "pm10"
  | "pm0_1"
  | "co2"
  | "tvoc"
  | "hcho"
  | "co"
  | "o3"
  | "no2"
  | "so2"
  // 2. Environment
  | "heat_index"
  | "uv_index"
  | "noise_level"
  | "pressure"
  | "illuminance"
  | "wind_speed"
  // 3. Humidity Metrics
  | "dew_point"
  | "absolute_humidity"
  // 4. Agronomy
  | "vpd"
  // Rating
  | "rating";

export interface SensorConfigObject {
  entity: string;
  name?: string;
  icon?: string;
  min?: number;
  max?: number;
  hidden?: boolean;
}

export interface AirQualityCardConfig {
  type: string;
  title?: string;
  width?: string; // e.g., "100%", "400px"
  height?: string;
  //entities: Partial<Record<SensorType, string>>;  // o3, no2, etc.
  //show_bars?: SensorType[];  // explicitly typed for clarity
  recommendation?: string;
  //_customThresholds?: Record<SensorType, { min?: number; max?: number }>;
  // แต่ละตัวแปรในคีย์สามารถเป็นได้ทั้งสตริงไอดีธรรมดา หรือเป็นวัตถุกำหนดค่า
  entities: Partial<Record<SensorType, string | SensorConfigObject>>;
}

interface hassWithFormat extends HomeAssistant {
  formatNumber(
    value: number,
    options?: {
      minimumFractionDigits?: number;
      maximumFractionDigits?: number;
    },
  ): string;
}

interface Thresholds {
  min: number;
  max: number;
  unit: string;
  icon: string;
  absoluteMin: number;
  absoluteMax: number;
}

// const SENSOR_THRESHOLDS: Record<string, Thresholds> = {
//   co2: { min: 400, max: 1000, unit: 'ppm', icon: 'mdi:molecule-co2', absoluteMin: 400, absoluteMax: 1300 },
//   voc: { min: 0, max: 500, unit: 'ppb', icon: 'mdi:chemical-weapon', absoluteMin: 0, absoluteMax: 1000 },
//   pm25: { min: 0, max: 35, unit: 'µg/m³', icon: 'mdi:blur', absoluteMin: 0, absoluteMax: 50 },
//   temperature: { min: 18, max: 26, unit: '°C', icon: 'mdi:thermometer', absoluteMin: -20, absoluteMax: 60 },
//   humidity: { min: 30, max: 60, unit: '%', icon: 'mdi:water-percent', absoluteMin: 0, absoluteMax: 100 },
// };
const SENSOR_THRESHOLDS: Partial<Record<SensorType, Thresholds>> = {
  // === กลุ่มที่ 1: มลพิษทางอากาศ ===
  pm0_1: {
    min: 0,
    max: 35,
    unit: "µg/m³",
    icon: "mdi:grain",
    absoluteMin: 0,
    absoluteMax: 100,
  },
  pm1: {
    min: 0,
    max: 35,
    unit: "µg/m³",
    icon: "mdi:grain",
    absoluteMin: 0,
    absoluteMax: 100,
  },
  pm2_5: {
    min: 0,
    max: 50,
    unit: "µg/m³",
    icon: "mdi:blur",
    absoluteMin: 0,
    absoluteMax: 150,
  },
  pm10: {
    min: 0,
    max: 100,
    unit: "µg/m³",
    icon: "mdi:blur",
    absoluteMin: 0,
    absoluteMax: 200,
  },
  co2: {
    min: 400,
    max: 1000,
    unit: "ppm",
    icon: "mdi:molecule-co2",
    absoluteMin: 400,
    absoluteMax: 2000,
  },
  tvoc: {
    min: 0,
    max: 500,
    unit: "ppb",
    icon: "mdi:air-filter",
    absoluteMin: 0,
    absoluteMax: 1000,
  },
  hcho: {
    min: 0,
    max: 0.1,
    unit: "mg/m³",
    icon: "mdi:chemical-weapon",
    absoluteMin: 0,
    absoluteMax: 0.5,
  },
  co: {
    min: 0,
    max: 9.0,
    unit: "ppm",
    icon: "mdi:molecule-co",
    absoluteMin: 0,
    absoluteMax: 25.0,
  }, // ปรับให้แล้วครับ กราฟจะไม่ตื่นตูม
  o3: {
    min: 0,
    max: 0.07,
    unit: "ppm",
    icon: "mdi:molecule",
    absoluteMin: 0,
    absoluteMax: 0.1,
  },
  no2: {
    min: 0,
    max: 0.05,
    unit: "ppm",
    icon: "mdi:gas-cylinder",
    absoluteMin: 0,
    absoluteMax: 0.2,
  },
  so2: {
    min: 0,
    max: 0.075,
    unit: "ppm",
    icon: "mdi:factory",
    absoluteMin: 0,
    absoluteMax: 0.5,
  },

  // === กลุ่มที่ 2: สภาพแวดล้อมโดยรวม ===
  heat_index: {
    min: 20,
    max: 27,
    unit: "°C",
    icon: "mdi:sun-thermometer",
    absoluteMin: 0,
    absoluteMax: 60,
  },
  uv_index: {
    min: 0,
    max: 2,
    unit: "UV",
    icon: "mdi:weather-sunny-alert",
    absoluteMin: 0,
    absoluteMax: 11,
  }, // เพิ่ม UV Index (เกณฑ์ 0-2 ต่ำ/ปลอดภัย)
  noise_level: {
    min: 30,
    max: 55,
    unit: "dB",
    icon: "mdi:ear-hearing",
    absoluteMin: 0,
    absoluteMax: 120,
  },
  pressure: {
    min: 1000,
    max: 1020,
    unit: "hPa",
    icon: "mdi:gauge",
    absoluteMin: 950,
    absoluteMax: 1050,
  },
  illuminance: {
    min: 0,
    max: 1000,
    unit: "lx",
    icon: "mdi:brightness-5",
    absoluteMin: 0,
    absoluteMax: 10000,
  },
  wind_speed: {
    min: 0,
    max: 10,
    unit: "m/s",
    icon: "mdi:weather-windy",
    absoluteMin: 0,
    absoluteMax: 50,
  },
  // === กลุ่มที่ 3: ความชื้นในอากาศ ===
  dew_point: {
    min: 10,
    max: 18,
    unit: "°C",
    icon: "mdi:thermometer-water",
    absoluteMin: -10,
    absoluteMax: 40,
  },
  absolute_humidity: {
    min: 4,
    max: 15,
    unit: "g/m³",
    icon: "mdi:water-percent",
    absoluteMin: 0,
    absoluteMax: 30,
  },

  // === กลุ่มที่ 4: การเกษตร/พืชผล ===
  vpd: {
    min: 0.8,
    max: 1.2,
    unit: "kPa",
    icon: "mdi:sprout",
    absoluteMin: 0,
    absoluteMax: 3.0,
  },
};

// const RATING_IMAGES: Record<string, string> = {
//   excellent: '/local/airquality/excellent.png',
//   good: '/local/airquality/good.png',
//   moderate: '/local/airquality/moderate.png',
//   poor: '/local/airquality/poor.png',
//   unhealthy: '/local/airquality/unhealthy.png',
// };
const RATING_IMAGES: Record<string, string> = {
  excellent: "/local/community/air-quality-card/img/excellent.png",
  good: "/local/community/air-quality-card/img/good.png",
  moderate: "/local/community/air-quality-card/img/moderate.png",
  poor: "/local/community/air-quality-card/img/poor.png",
  unhealthy: "/local/community/air-quality-card/img/unhealthy.png",
};

export class AirQualityCard extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property() private config!: AirQualityCardConfig;

  public setConfig(config: AirQualityCardConfig) {
    if (!config.entities) throw new Error("Entities required");
    this.config = config;
  }

  static styles = css`
    .card-wrapper {
      position: relative;
    }
    .badge {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      position: absolute;
      top: -45px;
      left: -15px;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
      border: 3px solid var(--card-background-color);
    }
    ha-card {
      padding: 15px;
      overflow: visible;
      max-width: 100%;
      box-sizing: border-box;
      /* กำหนดให้ ha-card เป็นคอนเทนเนอร์หลักในการเช็คความกว้าง */
      container-type: inline-size;
    }
    .recommendation-text {
      margin-top: 16px;
      font-size: 14px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color);
      padding: 10px;
      border-radius: 8px;
      line-height: 1.4;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .title {
      margin-left: 70px;
      font-weight: bold;
    }
    .attributes {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 12px;
      width: 100%;
    }
    .bar-container {
      display: flex;
      align-items: center;
      width: 100%;
      position: relative;
    }
    .icon {
      margin-right: 8px;
      font-size: 24px;
    }
    .bar {
      flex-grow: 1;
      height: 10px;
      border-radius: 3px;
      background: var(--primary-background-color);
      position: relative;
      overflow: hidden;
    }
    .value-above {
      text-align: right;
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-bottom: 6px;
      padding-right: 2px;
    }

    .gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to right,
        #1e8449 0%,
        #27ae60 25%,
        #2ecc71 50%,
        #f1c40f 60%,
        #e67e22 75%,
        #c0392b 90%,
        #922b21 100%
      );
      z-index: 1;
    }

    .mask {
      position: absolute;
      top: 0;
      bottom: 0;
      background: var(--primary-background-color);
      z-index: 2;
      right: 0;
    }

    .bar-wrapper {
      position: relative;
      flex-grow: 1;
    }

    .tooltip {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(-8px);
      background: #555;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s;
      z-index: 10;
    }

    .bar-wrapper:hover .tooltip {
      visibility: visible;
      opacity: 1;
    }
    /* === เงื่อนไขพิเศษซ่อนเซ็นเซอร์เมื่ออยู่ในช่วงความกว้างที่ต้องการ === */
    @media (min-width: 768px) {
      @container (min-width: 250px) and (max-width: 380px) {
        .low-priority-sensor {
          display: none !important;
        }
      }
    }
  `;

  static getConfigElement(): Promise<HTMLElement> {
    return Promise.resolve(document.createElement("air-quality-card-editor"));
  }

  static getStubConfig(): Record<string, any> {
    return {
      type: "custom:air-quality-card",
      title: "Air Quality",
      entities: {},
    };
  }
  // ฟังก์ชันช่วยเหลือ (Helper) สำหรับสกัดค่าคอนฟิกให้เป็น Object เสมอ
  private _getSensorConfig(key: SensorType): SensorConfigObject | undefined {
    const raw = this.config.entities?.[key];
    if (!raw) return undefined;
    if (typeof raw === "string") return { entity: raw };
    return raw;
  }

  // renderBar(key: string, entityId: string | undefined) {
  //   if (!entityId) return html``;
  //   const state = this.hass.states[entityId];
  //   if (!state || state.state === 'unavailable') return html``;

  //   // const value = parseFloat(state.state);
  //   const raw = state.state;
  //   const numeric = Number(raw);
  //   // const rounded = Math.round(numeric * 100) / 100;

  //   const hass = this.hass as hassWithFormat;

  //   // Round value to 2 decimal places safely
  //   const formatted = (Math.round((numeric + Number.EPSILON) * 100) / 100).toFixed(2);
  //   //console.log('Raw:', raw, 'Numeric:', numeric, 'Formatted:', formatted);

  //   const name = state.attributes.friendly_name || key.toUpperCase();
  //   const threshold = SENSOR_THRESHOLDS[key as SensorType] || { min: 0, max: 100, absoluteMin: 0, absoluteMax: 100, unit: '', icon: '' };
  //   const custom = (this.config as any)._customThresholds?.[key] || {};
  //   const min = custom.min ?? threshold.min;
  //   const max = custom.max ?? threshold.max;
  //   const absoluteMin = custom.min ?? threshold.absoluteMin;
  //   const absoluteMax = custom.max ?? threshold.absoluteMax;
  //   const unit = threshold.unit;
  //   const icon = threshold.icon;

  //   const tooltip = `${name} — healthy: ${min}–${max} ${unit}`;

  //   const fillPercent = Math.max(0, Math.min(100, ((numeric - absoluteMin) / (absoluteMax - absoluteMin)) * 100));
  //   const isLowPriority = key === 'vpd' || key === 'absolute_humidity' || key === 'dew_point' || key === 'heat_index';
  renderBar(key: SensorType, sensorConfig: SensorConfigObject) {
    const entityId = sensorConfig.entity;
    if (!entityId) return html``;
    const state = this.hass.states[entityId];
    if (!state || state.state === "unavailable") return html``;

    const raw = state.state;
    const numeric = Number(raw);
    const formatted = (
      Math.round((numeric + Number.EPSILON) * 100) / 100
    ).toFixed(2);
    const threshold = SENSOR_THRESHOLDS[key] || {
      min: 0,
      max: 100,
      absoluteMin: 0,
      absoluteMax: 100,
      unit: "",
      icon: "mdi:help",
    };

    // ดึงค่าตามลำดับความสำคัญ: Custom Config -> Default Threshold -> Fallback
    const name =
      sensorConfig.name || state.attributes.friendly_name || key.toUpperCase();
    const icon = sensorConfig.icon || threshold.icon;
    const min = sensorConfig.min ?? threshold.min;
    const max = sensorConfig.max ?? threshold.max;
    const absoluteMin = sensorConfig.min ?? threshold.absoluteMin;
    const absoluteMax = sensorConfig.max ?? threshold.absoluteMax;
    const unit = threshold.unit;

    const tooltip = `${name} — healthy: ${min}–${max} ${unit}`;
    const fillPercent = Math.max(
      0,
      Math.min(
        100,
        ((numeric - absoluteMin) / (absoluteMax - absoluteMin)) * 100,
      ),
    );

    // ดึงค่า hidden จากตั้งค่ามาใช้เป็นคลาส low-priority-sensor แทนการล็อกชื่อตายตัว
    const hiddenClass = sensorConfig.hidden ? "low-priority-sensor" : "";

    return html`
      <div
        class="bar-container ${hiddenClass}"
        @click=${() => fireEvent(this, "hass-more-info", { entityId })}
        style="cursor: pointer;"
        title="${tooltip}"
      >
        <ha-icon class="icon" icon="${icon}"></ha-icon>
        <div class="bar-wrapper">
          <div class="value-above">${formatted} ${unit}</div>
          <div class="bar">
            <div class="gradient"></div>
            <div class="mask" style="left: ${fillPercent}%; right: 0;"></div>
          </div>
          <div class="tooltip">${tooltip}</div>
        </div>
      </div>
    `;
  }

  isValueHealthy(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  }

  render() {
    const { title, entities } = this.config;
    const show_bars: SensorType[] = (
      Object.keys(entities) as SensorType[]
    ).filter((k) => k !== "rating");

    // วาดแถบบาร์ทั้งหมด
    const barElements = show_bars
      .filter(
        (key: SensorType) =>
          SENSOR_THRESHOLDS[key] && this._getSensorConfig(key)?.entity,
      )
      .map((key: SensorType) =>
        this.renderBar(key, this._getSensorConfig(key)!),
      );

    // เช็คสเตตัสความปลอดภัยรวม (allHealthy)
    const allHealthy = show_bars
      .filter((key) => SENSOR_THRESHOLDS[key])
      .every((key: SensorType) => {
        const conf = this._getSensorConfig(key);
        if (!conf || !conf.entity) return true;
        const state = this.hass.states[conf.entity];
        if (!state || state.state === "unavailable") return false;

        const value = parseFloat(state.state);
        const min = conf.min ?? SENSOR_THRESHOLDS[key]!.min;
        const max = conf.max ?? SENSOR_THRESHOLDS[key]!.max;
        return this.isValueHealthy(value, min, max);
      });

    // ดึงเรตติง
    const ratingConfig = this._getSensorConfig("rating");
    const ratingEntityId = ratingConfig?.entity;
    let rawState = "";
    let ratingKey = "moderate";

    if (ratingEntityId && this.hass.states[ratingEntityId]) {
      const state = this.hass.states[ratingEntityId].state;
      rawState = state ?? "";
      const candidate = rawState.toLowerCase().trim();
      if (candidate && RATING_IMAGES.hasOwnProperty(candidate)) {
        ratingKey = candidate;
      } else {
        console.warn(
          `[AirQualityCard] Unknown air quality rating: "${rawState}" — defaulting to "moderate"`,
        );
      }
    }

    const badgeImage = RATING_IMAGES[ratingKey];

    return html`
      <ha-card
        style="width: ${this.config.width || "100%"}; height: ${this.config
          .height || "auto"};"
      >
        <div class="card-wrapper">
          <img class="badge" src="${badgeImage}" alt="${rawState}" />
          <div class="header">
            <div class="title">
              ${title ? `${title} - ${rawState}` : rawState}
            </div>
          </div>
          <div class="attributes">${barElements}</div>
        </div>
        ${this.config.recommendation &&
        this.hass.states[this.config.recommendation]
          ? html`
              <div class="recommendation-text">
                ${this.hass.states[this.config.recommendation].state}
              </div>
            `
          : ""}
      </ha-card>
    `;
  }
}

if (!customElements.get("air-quality-card")) {
  customElements.define("air-quality-card", AirQualityCard);
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "air-quality-card",
  name: "Air Quality Card",
  description:
    "Displays air quality sensors with healthy ranges and gradients.",
  preview: true,
});

console.info("🧪 Registering card...");

customElements.whenDefined("air-quality-card").then(() => {
  console.info("✅ air-quality-card is defined and ready.");
});

if (!customElements.get("air-quality-card")) {
  console.warn("🚨 air-quality-card not defined yet, defining now...");
  customElements.define("air-quality-card", AirQualityCard);
} else {
  console.info("✅ air-quality-card already defined");
}
