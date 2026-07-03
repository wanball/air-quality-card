# Air Quality Card (Advanced)
[![HACS Custom](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)

Inspired by the Flower Card by Olen (https://github.com/Olen/lovelace-flower-card).

## Credits
This project is a heavily modified and enhanced version based on the original [air-quality-card](https://github.com/UrbanTechIO/air-quality-card) developed by [UrbanTechIO](https://github.com/UrbanTechIO). Licensed under the MIT License.

---

### [English Description]

An advanced custom Lovelace card for Home Assistant designed to comprehensively visualize air quality, climate, and environmental metrics. It supports object-level configuration, custom range overrides, dynamic icons, responsive grid hidden options via container queries, and up to 20+ specialized sensors.

#### Key Features
- **Object-based Configuration:** Customize each entity individually with personal names, overrides, icons, and visibility toggles.
- **Advanced Responsive Design:** Automatically hides low-priority indicators on tight dashboard columns using modern CSS container queries (`@container`).
- **Comprehensive Sensor Ecosystem:** Supports PM0.1, PM1, PM2.5, PM10, CO2, TVOC, HCHO, CO, O3, NO2, SO2, Heat Index, UV Index, Noise Level, Barometric Pressure, Illuminance, Wind Speed, Dew Point, Absolute Humidity, and Vapor Pressure Deficit (VPD).
- **Interactive Tooltips & Visual Ranges:** Shows targeted healthy thresholds on hover with live gradient bar positioning.

#### Installation

##### Via HACS (Recommended)
1. Open **HACS** → **Frontend**.
2. Click the three dots in the top right corner and select **Custom Repositories**.
3. Add your repository URL: `https://github.com/wanball/air-quality-card` and select **Dashboard** as the Type.
4. Click **Add**, then search for **Air Quality Card (Advanced)** and install it.

##### Asset Deployment
Make sure to copy all rating images from the `img` directory of this repository into your Home Assistant local directory:
`config/www/community/air-quality-card/img/`

#### Usage

##### Advanced YAML Example
```yaml
type: custom:air-quality-card
title: "Home Climate & Air Quality"
entities:
  pm1: sensor.indoor_pm1
  co2:
    entity: sensor.living_room_co2
    name: "Carbon Dioxide"
    icon: "mdi:molecule-co2"
    min: 400
    max: 1000
    hidden: true
  vpd:
    entity: sensor.greenhouse_vpd
    min: 0.8
    max: 1.2
  rating: sensor.air_quality_overall_rating
```

### 🛠 How to setup the Rating Sensor
The main badge image on the card relies on specific keywords to change its color and graphic. Your `rating` entity **must** output one of the following exact states (case-insensitive):
`excellent`, `good`, `moderate`, `poor`, `unhealthy`

If your current Air Quality integration (e.g., AirVisual, WAQI) outputs different text or numeric AQI values, you need to create a Template Sensor in your `configuration.yaml` to map those values to the required keywords. 

**Example Template Configuration:**
Replace `sensor.your_local_aqi_level` with your actual sensor ID and adjust the conditions as needed.

```yaml
template:
  - sensor:
      - name: "Air Quality Overall Rating"
        unique_id: air_quality_overall_rating
        state: >
          {% set aqi_state = states('sensor.your_local_aqi_level') | lower %}
          
          {% if aqi_state in ['good', 'excellent', '1'] %}
            good
          {% elif aqi_state in ['moderate', 'fair', '2'] %}
            moderate
          {% elif aqi_state in ['unhealthy_sensitive', 'poor', '3'] %}
            poor
          {% elif aqi_state in ['unhealthy', 'very_unhealthy', 'hazardous', '4', '5'] %}
            unhealthy
          {% else %}
            moderate
          {% endif %}
```
---

### [Thai Description]
Custom Lovelace Card สำหรับ Home Assistant ออกแบบมาเพื่อแสดงผลค่าชี้วัดคุณภาพอากาศ สภาพภูมิอากาศ และสภาพแวดล้อมอย่างละเอียดรอบด้าน รองรับการตั้งค่าโครงสร้างข้อมูลแบบวัตถุ (Object Config) แยกรายเซ็นเซอร์, ปรับเปลี่ยนเกณฑ์ช่วงปลอดภัย, ปรับเปลี่ยนไอคอน, มีระบบซ่อนอัจฉริยะเมื่อการ์ดอยู่ในคอลัมน์ที่แคบ (Container Queries) และรองรับเซ็นเซอร์เฉพาะทางมากกว่า 20 ชนิด

#### คุณสมบัติเด่น
- **การตั้งค่าแบบวัตถุ (Object Config): กำหนดชื่อเฉพาะ (Name), ไอคอน (Icon), ช่วงปลอดภัย (Min/Max), และสวิตช์ซ่อนอัตโนมัติ (Hidden) แยกอิสระตามรายเอนทิตีได้ผ่านหน้าการตั้งค่า (Visual Editor)

- **ระบบจัดหน้าจออัจฉริยะ: ซ่อนเซ็นเซอร์ที่มีความสำคัญรองโดยอัตโนมัติเมื่อ ha-card ถูกบีบความกว้างให้อยู่ในช่วงแคบ (ใช้ระบบ CSS @container) ทำให้การ์ดไม่ยาวเกินไปบนหน้าจอแล็ปท็อปหรือแท็บเล็ต แต่จะคงแสดงผลครบทุกตัวตามธรรมชาติเมื่ออยู่บนสมาร์ทโฟนแบบคอลัมน์เดี่ยว

- **รองรับเซ็นเซอร์ครอบคลุม: ขยายการรองรับฝุ่นละเอียดพิเศษ PM0.1, PM1, PM2.5, PM10, คาร์บอนไดออกไซด์ (CO2), สารระเหย (TVOC), ฟอร์มาลดีไฮด์ (HCHO), คาร์บอนมอนอกไซด์ (CO), โอโซน (O3), ไนโตรเจนไดออกไซด์ (NO2), ซัลเฟอร์ไดออกไซด์ (SO2), ดัชนีความร้อน (Heat Index), ดัชนียูวี (UV Index), ระดับเสียง (Noise Level), ความกดอากาศ (Pressure), ความสว่าง (Illuminance), ความเร็วลม (Wind Speed), จุดน้ำค้าง (Dew Point), ความชื้นสัมบูรณ์ (Absolute Humidity) และ ความต่างของความดันไอน้ำ (VPD)

- **การโต้ตอบแบบเรียลไทม์: แถบกราฟไล่สีตามเกณฑ์อันตรายจริง พร้อมหน้าต่างข้อมูลสั้น (Tooltip) แสดงช่วงสถิติตัวเลขเมื่อนำเมาส์ไปชี้

#### วิธีการติดตั้ง

##### ติดตั้งผ่าน HACS (แนะนำ)
1. ไปที่เมนู HACS → Frontend
2. คลิกจุด 3 จุดที่มุมขวาบน เลือก Custom Repositories
3. วางลิงก์ URL ของคุณ: https://github.com/wanball/air-quality-card และเลือกประเภท (Type) เป็น Dashboard
4. กด Add จากนั้นค้นหาชื่อโปรเจกต์ Air Quality Card (Advanced) เพื่อสั่งติดตั้ง
5. ตรวจสอบให้แน่ใจว่าได้ทำการลงทะเบียน Resource เมนูแดชบอร์ดระบบชี้พาธไปยังไฟล์ air-quality-card.js เรียบร้อยแล้ว

##### การคัดลอกไฟล์รูปภาพเรตติง
กรุณาคัดลอกไฟล์รูปภาพแสดงสถานะทั้งหมดจากโฟลเดอร์ img ในโปรเจกต์นี้ ไปวางไว้ในโฟลเดอร์บนระบบ Home Assistant ของคุณที่พาธ:
config/www/community/air-quality-card/img/

##### Advanced YAML Example
```yaml
type: custom:air-quality-card
title: "Home Climate & Air Quality"
entities:
  pm1: sensor.indoor_pm1
  co2:
    entity: sensor.living_room_co2
    name: "Carbon Dioxide"
    icon: "mdi:molecule-co2"
    min: 400
    max: 1000
    hidden: true
  vpd:
    entity: sensor.greenhouse_vpd
    min: 0.8
    max: 1.2
  rating: sensor.air_quality_overall_rating
```

### 🛠 การตั้งค่าเซ็นเซอร์เรตติง
รูปภาพสัญลักษณ์ (Badge) ที่มุมซ้ายบนของการ์ด จะเปลี่ยนกราฟิกตามคีย์เวิร์ดเฉพาะเท่านั้น เอนทิตี (Entity) ในช่อง rating ของคุณ จำเป็นต้องส่งค่า ออกมาเป็นคำเหล่านี้คำใดคำหนึ่ง:
excellent, good, moderate, poor, unhealthy

หากระบบเซ็นเซอร์คุณภาพอากาศที่คุณใช้อยู่ (เช่น AirVisual, WAQI) ส่งค่าออกมาเป็นตัวเลข AQI หรือเป็นคำศัพท์อื่นๆ คุณจะต้องสร้าง เทมเพลตเซ็นเซอร์ (Template Sensor) ในไฟล์ configuration.yaml เพื่อแปลงค่าเหล่านั้นให้ตรงกับที่การ์ดต้องการ

**ตัวอย่างการตั้งค่า Template Sensor:**
คุณสามารถนำโค้ดด้านล่างไปประยุกต์ใช้ โดยเปลี่ยน sensor.your_local_aqi_level เป็นชื่อเซ็นเซอร์จริงของคุณ และปรับแก้เงื่อนไข {% if ... %} ให้ตรงกับค่าที่เซ็นเซอร์ของคุณส่งออกมา
```yaml
template:
  - sensor:
      - name: "Air Quality Overall Rating"
        unique_id: air_quality_overall_rating
        state: >
          {% set aqi_state = states('sensor.your_local_aqi_level') | lower %}
          
          {% if aqi_state in ['good', 'excellent', '1'] %}
            good
          {% elif aqi_state in ['moderate', 'fair', '2'] %}
            moderate
          {% elif aqi_state in ['unhealthy_sensitive', 'poor', '3'] %}
            poor
          {% elif aqi_state in ['unhealthy', 'very_unhealthy', 'hazardous', '4', '5'] %}
            unhealthy
          {% else %}
            moderate
          {% endif %}
```
---
