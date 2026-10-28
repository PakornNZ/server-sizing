# 🎨 UI Design System & Component Guidelines Template

เอกสารคู่มือมาตรฐานการออกแบบ (Design System Specification) การกำหนด Style Tokens, CSS Variables, Typography Scale, Data Layout, Search & Filter Components สำหรับใช้เป็น Template กลางในโปรเจกต์เว็บแอปพลิเคชัน

---

## 📑 สารบัญ (Table of Contents)
1. [Core Design Principles (หลักการออกแบบภาพรวม)](#1-core-design-principles)
2. [Design Tokens & CSS Variables (ตัวแปรและชุดสี)](#2-design-tokens--css-variables)
3. [Typography Scale (ขนาดฟอนต์และการจัดวางข้อความ)](#3-typography-scale)
4. [Data Segmentation & Layout (การแบ่งสัดส่วนและโครงสร้างข้อมูล)](#4-data-segmentation--layout)
5. [Search Bar Specification (ช่องค้นหา)](#5-search-bar-specification)
6. [Filter Controls Specification (ช่องและแถบตัวกรอง)](#6-filter-controls-specification)
7. [Component Code Templates (โค้ดตัวอย่างพร้อมใช้)](#7-component-code-templates)

---

## 1. Core Design Principles

| หลักการ | คำอธิบายและแนวทางปฏิบัติ |
| :--- | :--- |
| **Hierarchy & Visual Weight** | ใช้ขนาดฟอนต์ น้ำหนัก (`font-weight`) และสี (`--color-text-muted`, `--color-text-secondary`) เพื่อกำหนดลำดับความสำคัญ แทนที่จะใช้กรอบตีกรอบทุกจุด |
| **Layering & Elevation** | แบ่งชั้น UI ด้วยพื้นหลัง 3 ระดับ: `--background` (พื้นหลังล่างสุด) ➔ `--background-card` (การ์ด/คอนเทนเนอร์) ➔ `--background-elevated` (แถบเครื่องมือ/ป๊อปอัป/ดรอปดาวน์) |
| **State Feedback** | ทุกองค์ประกอบที่มีการคลิก/โฮเวอร์ ต้องมี transition นุ่มนวล (~200ms) และ active/focus ring ที่ชัดเจน |
| **Responsive & Touch Friendly** | บนอุปกรณ์พกพา Input/Select ต้องมีความสูงอย่างน้อย `40px` - `44px` และขนาดฟอนต์ไม่ต่ำกว่า `16px` เพื่อป้องกัน Mobile Browser Auto-zoom |

---

## 2. Design Tokens & CSS Variables

### 2.1 CSS Variables Baseline (`globals.css`)

```css
:root {
  /* --- Semantic Colors (Light Mode) --- */
  --background: #f8fafc;              /* Slate-50: พื้นหลังของหน้าเว็บ */
  --background-card: #ffffff;         /* White: พื้นหลังการ์ดหรือตาราง */
  --background-elevated: #f1f5f9;     /* Slate-100: พื้นหลังปุ่มรอง, Dropdown, Hover */
  --background-fade: #f1f5f9;

  /* --- Text Colors --- */
  --color-text: #0f172a;              /* Slate-900: ข้อความหลัก (Primary Heading/Body) */
  --color-text-secondary: #475569;    /* Slate-600: คำอธิบาย, Label, Subtitle */
  --color-text-muted: #94a3b8;        /* Slate-400: Placeholder, Icon รอง, Timestamp */

  /* --- Primary Brand Color --- */
  --color-primary: #2563eb;           /* Blue-600: ปุ่มหลัก, Active State, Focus Ring */
  --color-primary-hover: #1d4ed8;     /* Blue-700 */
  --color-primary-subtle: #eff6ff;    /* Blue-50: Badge, Active Tab Background */
  --color-primary-subtle-border: #bfdbfe; /* Blue-200 */

  /* --- Status / Accent Colors --- */
  --color-green: #10b981;
  --color-green-hover: #ecfdf5;
  --color-green-text: #047857;

  --color-red: #ef4444;
  --color-red-hover: #fef2f2;
  --color-red-text: #b91c1c;

  --color-yellow: #f59e0b;
  --color-yellow-hover: #fffbeb;
  --color-yellow-text: #b45309;

  /* --- Borders & Outlines --- */
  --color-border: #e2e8f0;            /* Slate-200: เส้นขอบทั่วไป */
  --color-border-subtle: #f1f5f9;     /* Slate-100: เส้นคั่นแถวตาราง */
  --color-border-hover: #cbd5e1;      /* Slate-300: ขอบเมื่อโฮเวอร์ */

  /* --- Border Radius --- */
  --radius-xs: 4px;                   /* Checkbox, Small Badge */
  --radius-sm: 6px;                   /* Chip, Pill, Tooltip */
  --radius-min: 8px;                  /* Input, Button, Dropdown item */
  --radius-med: 10px;                 /* Dropdown menu, Modal box */
  --radius-max: 14px;                 /* Card container, Big Table wrapper */
  --radius-full: 9999px;              /* Avatar, Rounded Badge */

  /* --- Shadows (Box Shadows) --- */
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.04);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.05);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.05);

  /* --- Transitions --- */
  --transition-duration: 200ms;
  --transition: all var(--transition-duration) cubic-bezier(0.4, 0, 0.2, 1);
}

/* --- Dark Theme Support --- */
:root[data-theme='dark'],
@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    --background: #111113;
    --background-card: #19191c;
    --background-elevated: #232328;
    --background-fade: #28282e;

    --color-text: #ffffff;
    --color-text-secondary: #d4d4d8;
    --color-text-muted: #71717a;

    --color-primary: #3b82f6;
    --color-primary-hover: #60a5fa;
    --color-primary-subtle: rgba(59, 130, 246, 0.16);
    --color-primary-subtle-border: rgba(59, 130, 246, 0.35);

    --color-green: #34d399;
    --color-green-hover: rgba(52, 211, 153, 0.15);
    --color-green-text: #6ee7b7;

    --color-red: #f87171;
    --color-red-hover: rgba(248, 113, 113, 0.15);
    --color-red-text: #fca5a5;

    --color-border: #2e2e34;
    --color-border-subtle: #222227;
    --color-border-hover: #45454f;

    --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.4);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.5);
  }
}
```

---

## 3. Typography Scale

ระบบการตั้งขนาดตัวอักษรและระดับความสำคัญ (Type Scale)

```
Hierarchy Map:
┌────────────────────────────────────────────────────────┐
│ Page Title (24px / 1.5rem, SemiBold 600)               │
│ ┌────────────────────────────────────────────────────┐ │
│ │ Section / Card Title (18px / 1.125rem, Med 500)     │ │
│ │ ┌────────────────────────────────────────────────┐ │ │
│ │ │ Body Text (14px / 0.875rem, Regular 400)       │ │ │
│ │ │ ┌────────────────────────────────────────────┐ │ │ │
│ │ │ │ Meta / Badge / Hint (12px / 0.75rem)       │ │ │ │
│ │ │ └────────────────────────────────────────────┘ │ │ │
│ │ └────────────────────────────────────────────────┘ │ │
│ └────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

### 3.1 ตารางกำหนดขนาดฟอนต์ (Typography Tokens)

| Token Name | Size (px/rem) | Line Height | Weight | การนำไปใช้งาน (Use Case) |
| :--- | :--- | :--- | :--- | :--- |
| `text-display` | `32px / 2.0rem` | `1.2` | Bold (700) | Hero Headline, Dashboard Hero Metric |
| `text-h1` | `24px / 1.5rem` | `1.3` | SemiBold (600) | Page Title (หัวข้อหลักประจำหน้า) |
| `text-h2` | `20px / 1.25rem` | `1.35` | SemiBold (600) | Section Header, Drawer / Modal Header |
| `text-h3` | `16px / 1.0rem` | `1.4` | Medium (500) | Card Title, Table Group Header |
| `text-body` | `14px / 0.875rem` | `1.5` | Regular (400) | ข้อความทั่วไปในตาราง, Input, Form Field |
| `text-body-strong` | `14px / 0.875rem` | `1.5` | Medium (500) | Table Row Primary Value, Button Label |
| `text-small` | `12px / 0.75rem` | `1.4` | Regular (400) | Helper text, Validation Message, Timestamp |
| `text-caption` | `11px / 0.6875rem` | `1.3` | Medium (500) | Table Header (`<th>`), Status Badge, Micro Tag |

---

## 4. Data Segmentation & Layout (การแบ่งสัดส่วนข้อมูล)

### 4.1 โครงสร้างหน้าเว็บมาตรฐาน (Standard Layout Anatomy)

```
+----------------------------------------------------------------------+
| 1. Page Header (Title + Breadcrumbs + Primary Actions)               |
+----------------------------------------------------------------------+
| 2. Metric / Summary Cards (Stat 1, Stat 2, Stat 3)                   |
+----------------------------------------------------------------------+
| 3. Action Toolbar (Search Box + Filter Dropdowns + Filter Chips)     |
+----------------------------------------------------------------------+
| 4. Main Data Region (Table / Card Grid / List View)                  |
|    - Table Header (Sorting + Columns)                                |
|    - Content Rows                                                    |
+----------------------------------------------------------------------+
| 5. Footer Pagination & Selection Info Bar                            |
+----------------------------------------------------------------------+
```

### 4.2 กฎการจัด Spacing & Padding
- **Page Container Padding**: `padding: 1.25rem 1.5rem` (บน Desktop), `1rem` (บน Mobile)
- **Section Gap**: `gap: 1.25rem` ถึง `1.5rem` (ระยะห่างระหว่างการ์ด/ส่วนต่างๆ)
- **Card Padding**: `padding: 1.25rem` สำหรับ Main Card และ `0.75rem` - `1rem` สำหรับ Compact Card
- **Table Cell Padding**: `padding: 0.75rem 1rem` (ความสูงแถวพอดี ไม่แน่นหรือหลวมเกินไป)

---

## 5. Search Bar Specification (ช่องค้นหา)

ช่องค้นหาที่ดีต้องตอบสนองเร็ว ชัดเจน มีไอคอนระบุความหมาย และมีปุ่ม Clear เมื่อมีข้อความ

### 5.1 Design & Dimensions
- **ความสูงมาตรฐาน (Height)**: `38px` (Compact) หรือ `42px` (Standard)
- **ความกว้างขั้นต่ำ (Min-Width)**: `220px` (บน Toolbar ขยายได้ `flex: 1 1 280px`)
- **ขอบมน (Border Radius)**: `var(--radius-min)` (`8px`)
- **Icon Search**: วางทางด้านซ้าย หรือด้านขวา ขนาด `16px x 16px` สี `--color-text-muted`
- **ปุ่มล้างคำค้นหา (Clear Button)**: ปรากฏเฉพาะเมื่อมีค่า (`value.length > 0`)

### 5.2 CSS Implementation for Search Box

```css
.search-box {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1 1 260px;
  max-width: 420px;
  min-width: 180px;
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  width: 16px;
  height: 16px;
  color: var(--color-text-muted);
  pointer-events: none;
  transition: color var(--transition-duration) ease;
}

.search-input {
  width: 100%;
  height: 38px;
  padding: 0.5rem 2.25rem 0.5rem 2.25rem; /* ซ้ายเว้นที่ให้ไอคอนค้นหา ขวาเว้นให้ปุ่มล้าง */
  background: var(--background-card);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-min);
  font-size: 0.875rem;
  transition: var(--transition);
}

.search-input::placeholder {
  color: var(--color-text-muted);
}

.search-input:hover {
  border-color: var(--color-border-hover);
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-subtle);
  background: var(--background-card);
}

.search-clear-btn {
  position: absolute;
  right: 0.625rem;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background-elevated);
  border: none;
  border-radius: var(--radius-full);
  color: var(--color-text-muted);
  cursor: pointer;
}

.search-clear-btn:hover {
  color: var(--color-text);
  background: var(--color-border);
}
```

---

## 6. Filter Controls Specification (ช่องและแถบตัวกรอง)

ตัวกรองช่วยจำกัดขอบเขตข้อมูล แบ่งออกเป็น 3 รูปแบบหลัก:

### 6.1 รูปแบบตัวกรอง (Filter Types)

```
1. Quick Filter Chips (Pill Buttons)
   [ All (45) ] [ Active (32) ] [ Inactive (13) ] [ Flagged (2) ]

2. Dropdown Filter (Select Menu)
   [ Provider: All ▾ ]  [ Status: Published ▾ ]  [ Date Range: Last 30 Days ▾ ]

3. Applied Filters Bar with Reset
   Showing results for:  ( Provider: Google ✕ ) ( Status: Active ✕ ) [ Reset All ]
```

### 6.2 Filter Design Guidelines
1. **Dropdown Select**:
   - ความสูงเท่ากับ Search Input (`38px`) เพื่อให้อยู่ในแนวระนาบเดียวกัน (Visual Alignment)
   - มีป้ายกำกับบอกชัดเจน เช่น `Category: AI Models`
2. **Filter Chips / Badge**:
   - ความสูง `28px` - `30px`, Border Radius `var(--radius-full)` หรือ `var(--radius-sm)`
   - สภาพ Active: พื้นหลังสี `--color-primary-subtle`, ขอบสี `--color-primary-subtle-border`, ตัวอักษรสี `--color-primary`
3. **Reset Filters**:
   - ปุ่มล้างเงื่อนไขทั้งหมด แสดงเมื่อมีการเลือก Filter อย่างน้อย 1 เงื่อนไข

---

## 7. Component Code Templates

### 7.1 Reusable React Toolbar (Search + Filters + Actions)

```tsx
import React from 'react';
import { Search, X, Filter, RotateCcw } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface TableToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categoryOptions: FilterOption[];
  onResetFilters?: () => void;
  totalResults?: number;
}

export const TableToolbar: React.FC<TableToolbarProps> = ({
  searchValue,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categoryOptions,
  onResetFilters,
  totalResults,
}) => {
  const isFiltered = Boolean(searchValue || selectedCategory);

  return (
    <div className="flex flex-col gap-3 py-3 px-4 bg-[var(--background-card)] border-b border-[var(--color-border)] rounded-t-[var(--radius-max)]">
      {/* Upper Bar: Search & Main Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Search Bar */}
        <div className="search-box">
          <Search className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="ค้นหาชื่อ, รหัส, หรือรายละเอียด..."
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchValue && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => onSearchChange('')}
              title="ล้างคำค้นหา"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Right: Dropdowns & Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Dropdown Filter */}
          <div className="relative flex items-center">
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="h-[38px] pl-3 pr-8 bg-[var(--background-card)] text-[var(--color-text)] border border-[var(--color-border)] rounded-[var(--radius-min)] text-sm focus:outline-none focus:border-[var(--color-primary)] transition"
            >
              <option value="">ทุกหมวดหมู่ (All)</option>
              {categoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters Button */}
          {isFiltered && onResetFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="h-[38px] px-3 flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-red-text)] hover:bg-[var(--color-red-hover)] border border-[var(--color-border)] rounded-[var(--radius-min)] transition"
            >
              <RotateCcw size={13} />
              <span>รีเซ็ต</span>
            </button>
          )}
        </div>
      </div>

      {/* Lower Bar: Active Filter Chips & Result Counter */}
      {totalResults !== undefined && (
        <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] pt-1">
          <span>พบทั้งหมด <strong>{totalResults.toLocaleString()}</strong> รายการ</span>
          {isFiltered && (
            <span className="text-[var(--color-primary)] font-medium">กำลังแสดงผลลัพธ์ที่ผ่านการกรอง</span>
          )}
        </div>
      )}
    </div>
  );
};
```

### 7.2 Status Badge / Chip Standard Classes

```css
/* Badge & Status Tokens */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  border: 1px solid transparent;
}

.badge-success {
  background: var(--color-green-hover);
  color: var(--color-green-text);
  border-color: rgba(16, 185, 129, 0.2);
}

.badge-primary {
  background: var(--color-primary-subtle);
  color: var(--color-primary);
  border-color: var(--color-primary-subtle-border);
}

.badge-danger {
  background: var(--color-red-hover);
  color: var(--color-red-text);
  border-color: rgba(239, 68, 68, 0.2);
}

.badge-neutral {
  background: var(--background-elevated);
  color: var(--color-text-secondary);
  border-color: var(--color-border);
}
```

---

## 8. Checklist ก่อนขึ้น UI จริง (Pre-delivery Checklist)

- [ ] **Contrast Ratio**: ตัวหนังสือมีความคมชัด อ่านง่าย ทั้ง Light Mode และ Dark Mode (ผ่านเกณฑ์ WCAG AA ขั้นต่ำ 4.5:1)
- [ ] **Focus Visible**: ทุก Input, Select, Button แสดงกรอบ Highlight เมื่อกด Tab ด้วยคีย์บอร์ด
- [ ] **Clear Actions**: มีปุ่มล้างคำค้นหาหรือตัวกรองเมื่อผู้ใช้เลือกเงื่อนไขค้างไว้
- [ ] **Empty State**: มีการแสดงหน้าว่าง (Empty State) พร้อมข้อความที่ชัดเจนเมื่อค้นหาข้อมูลไม่พบ
- [ ] **Consistent Sizing**: ความสูงของ Search Bar, Select Box, และ Action Button ในแถวเดียวกันมีขนาดเท่ากัน (`38px` หรือ `40px`)
