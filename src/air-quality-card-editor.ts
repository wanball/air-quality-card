import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, fireEvent } from 'custom-card-helpers';
import { AirQualityCardConfig, SensorType, SensorConfigObject } from './air-quality-card';

@customElement('air-quality-card-editor')
export class AirQualityCardEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config!: AirQualityCardConfig;

  setConfig(config: AirQualityCardConfig) {
    this._config = { ...config };
  }

  // static styles = css`
  //   .sensor-entry {
  //     margin-bottom: 12px;
  //     padding: 6px;
  //     border: 1px solid #ddd;
  //     border-radius: 6px;
  //   }
  //   .sensor-entry label {
  //     display: block;
  //     font-weight: bold;
  //     margin-bottom: 4px;
  //   }
  //   input[type="number"], input[type="text"] {
  //     background-color: rgb(110, 110, 110);
  //     color: #000;
  //     border: 1px solid #ccc;
  //     border-radius: 4px;
  //     padding: 4px;
  //     width: 100%;
  //     box-sizing: border-box;
  //   }
  // `;
  static styles = css`
    .sensor-entry {
      margin-bottom: 16px;
      padding: 12px;
      border: 1px solid var(--divider-color, #e8e8e8);
      border-radius: 8px;
      background: var(--secondary-background-color, #f9f9f9);
    }
    .sensor-title {
      font-size: 14px;
      font-weight: bold;
      color: var(--primary-text-color);
      margin-bottom: 8px;
      border-bottom: 1px solid var(--divider-color, #e8e8e8);
      padding-bottom: 4px;
    }
    .field-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-top: 8px;
    }
    label {
      display: block;
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 4px;
    }
    input[type="number"], input[type="text"] {
      background-color: var(--card-background-color, #fff);
      color: var(--primary-text-color, #000);
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 4px;
      padding: 6px;
      width: 100%;
      box-sizing: border-box;
    }
    .checkbox-row {
      display: flex;
      align-items: center;
      margin-top: 8px;
      gap: 6px;
    }
    .checkbox-row input {
      margin: 0;
    }
  `;

  // private _valueChanged(ev: Event, key: SensorType, field: string) {
  //   if (!this._config.entities) return;
  //   const target = ev.target as HTMLInputElement;
  //   const newVal = field === 'min' || field === 'max' ? parseFloat(target.value) : target.value;

  //   if (!this._config.entities[key]) this._config.entities[key] = '';

  //   if (!('_customThresholds' in this._config)) {
  //     (this._config as any)._customThresholds = {};
  //   }

  //   (this._config as any)._customThresholds[key] = {
  //     ...(this._config as any)._customThresholds?.[key],
  //     [field]: newVal
  //   };

  //   fireEvent(this, 'config-changed', { config: this._config });
  // }
// ฟังก์ชันสกัดอ็อบเจกต์ออกมาเพื่อให้ปลอดภัยในการดึงค่า
  private _getSensorObject(key: SensorType): SensorConfigObject {
    const raw = this._config.entities?.[key];
    if (!raw) return { entity: '' };
    if (typeof raw === 'string') return { entity: raw };
    return raw;
  }

  // ฟังก์ชันบันทึกการเปลี่ยนแปลงของฟิลด์ย่อยแต่ละตัวแปรในวัตถุ
  private _sensorSubFieldChanged(ev: Event, key: SensorType, field: keyof SensorConfigObject) {
    if (!this._config.entities) this._config.entities = {};
    
    const target = ev.target as HTMLInputElement;
    const currentObj = this._getSensorObject(key);
    
    let value: any = target.value;
    if (target.type === 'number') {
      value = target.value === '' ? undefined : parseFloat(target.value);
    } else if (target.type === 'checkbox') {
      value = target.checked;
    }

    this._config.entities = {
      ...this._config.entities,
      [key]: {
        ...currentObj,
        [field]: value
      }
    };

    fireEvent(this, 'config-changed', { config: this._config });
  }

  render() {
    if (!this.hass || !this._config) return html``;

    const sensors: SensorType[] = [
      'pm1', 'pm2_5', 'pm10', 'pm0_1', 'co2', 'tvoc', 'hcho', 'co', 'o3', 'no2', 'so2',
      'heat_index', 'uv_index', 'noise_level', 'pressure', 'illuminance', 'wind_speed',
      'dew_point', 'absolute_humidity', 'vpd',
      'rating'
    ];
    const customThresholds = (this._config as any)._customThresholds || {};

  return html`
      <div class="card-config">
        <div class="sensor-entry">
          <div class="sensor-title">CARD SETTINGS</div>
          <label>Title <input type="text" .value=${this._config.title || ''} @input=${(e: any) => { this._config.title = e.target.value; fireEvent(this, 'config-changed', { config: this._config }); }} /></label>
          <div class="field-row">
            <label>Width <input type="text" .value=${this._config.width || ''} @input=${(e: any) => { this._config.width = e.target.value; fireEvent(this, 'config-changed', { config: this._config }); }} /></label>
            <label>Height <input type="text" .value=${this._config.height || ''} @input=${(e: any) => { this._config.height = e.target.value; fireEvent(this, 'config-changed', { config: this._config }); }} /></label>
          </div>
          <label style="margin-top:8px;">Recommendation Sensor
            <ha-entity-picker .hass=${this.hass} .value=${this._config.recommendation || ''} @value-changed=${(e: any) => { this._config.recommendation = e.detail.value; fireEvent(this, 'config-changed', { config: this._config }); }} allow-custom-entity></ha-entity-picker>
          </label>
        </div>

        ${sensors.map(sensorKey => {
          const sensorObj = this._getSensorObject(sensorKey);
          return html`
            <div class="sensor-entry">
              <div class="sensor-title">${sensorKey.toUpperCase()}</div>
              
              <label>Entity</label>
              <ha-entity-picker
                .hass=${this.hass}
                .value=${sensorObj.entity}
                @value-changed=${(e: any) => this._sensorSubFieldChanged(e, sensorKey, 'entity')}
                allow-custom-entity
              ></ha-entity-picker>

              <div class="field-row">
                <label>Custom Name <input type="text" .value=${sensorObj.name || ''} @input=${(e: any) => this._sensorSubFieldChanged(e, sensorKey, 'name')} /></label>
                <label>Custom Icon <input type="text" .value=${sensorObj.icon || ''} @input=${(e: any) => this._sensorSubFieldChanged(e, sensorKey, 'icon')} /></label>
              </div>

              ${sensorKey !== 'rating' ? html`
                <div class="field-row">
                  <label>Override Min <input type="number" .value=${sensorObj.min ?? ''} @input=${(e: any) => this._sensorSubFieldChanged(e, sensorKey, 'min')} /></label>
                  <label>Override Max <input type="number" .value=${sensorObj.max ?? ''} @input=${(e: any) => this._sensorSubFieldChanged(e, sensorKey, 'max')} /></label>
                </div>
                <div class="checkbox-row">
                  <input type="checkbox" id="hide-${sensorKey}" .checked=${!!sensorObj.hidden} @change=${(e: any) => this._sensorSubFieldChanged(e, sensorKey, 'hidden')} />
                  <label for="hide-${sensorKey}">Hide on narrow container (Low Priority)</label>
                </div>
              ` : ''}
            </div>
          `;
        })}
      </div>
    `;
  }
}
