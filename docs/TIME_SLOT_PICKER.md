# Time Slot Picker - Novo Componente

## Descrição

O `TimeSlotPicker` é um novo componente de seleção de horários que substitui o `TimeSelect`. Ele apresenta os horários organizados em três períodos do dia:

- **Manhã** (00:00 - 11:59)
- **Tarde** (12:00 - 17:59)
- **Noite** (18:00 - 23:59)

## Estrutura Visual

```
Horários
├── Manhã
│   ├── [08:00] [08:30] [09:00] [09:30]
│   └── [10:00] [10:30] [11:00] [11:30]
├── Tarde
│   ├── [12:00] [12:30] [13:00] [13:30]
│   └── [14:00] [14:30] [15:00] [15:30]
└── Noite
    ├── [18:00] [18:30] [19:00] [19:30]
    └── [20:00] [20:30] [21:00]
```

## Estados dos Botões

### 1. **Disponível** (padrão)
- Fundo: `bg-gray-700` (escuro)
- Texto: `text-gray-100` (claro)
- Hover: `hover:bg-gray-600`
- Dark mode: `dark:bg-gray-800 dark:text-gray-200`

### 2. **Indisponível**
- Fundo: `bg-gray-700` com `opacity-50`
- Texto: `text-gray-500` (acinzentado)
- Cursor: `cursor-not-allowed`
- Dark mode: `dark:opacity-40`

### 3. **Selecionado** (ativo)
- Fundo: `bg-gray-700`
- Texto: `text-yellow-400` ou `dark:text-yellow-300`
- Borda: `border-2 border-yellow-400`
- Combinado: Amarelo com borda amarela mantendo fundo escuro

## Temas Dark/Light

O componente suporta totalmente light e dark mode com classes Tailwind:

```tsx
// Light mode (padrão)
bg-gray-700 text-gray-100

// Dark mode
dark:bg-gray-800 dark:text-gray-200

// Selecionado light
text-yellow-400 border-yellow-400

// Selecionado dark
dark:text-yellow-300 dark:border-yellow-300
```

## Componentes Criados

### 1. `TimeSlotPicker` (time-slot-picker.tsx)
Componente principal que organiza os slots por período.

**Props:**
```typescript
interface TimeSlotPickerProps {
    value?: TimeValue;
    onChange?: (value: TimeValue) => void;
    step?: number;              // minutos (padrão: 30)
    startHour?: number;         // hora inicial (padrão: 0)
    endHour?: number;           // hora final (padrão: 24)
    unavailableSlots?: string[]; // ["11:00", "13:00", ...]
}
```

### 2. `TimeSlotButton` (time-slot-button.tsx)
Botão individual representando um horário.

**Props:**
```typescript
interface TimeSlotButtonProps {
    time: TimeValue;
    label: string;
    available?: boolean;
    selected?: boolean;
    onClick?: (time: TimeValue) => void;
}
```

## Tipos Atualizados

```typescript
// types/scheduling.ts

export type TimeSelectOption = {
    value: TimeValue;
    label: string;
    available?: boolean;  // NEW: indica se está disponível
};

export type TimePeriod = 'morning' | 'afternoon' | 'evening'; // NEW

export type TimeSlotGroup = {  // NEW
    period: TimePeriod;
    label: string;  // "Manhã", "Tarde", "Noite"
    slots: TimeSelectOption[];
};
```

## Funções Utilitárias Adicionadas

```typescript
// utils/time-select.utils.ts

// Determina o período baseado na hora
getPeriod(hour: number): TimePeriod

// Agrupa os slots por período do dia
groupOptionsByPeriod(options: TimeSelectOption[]): TimeSlotGroup[]
```

## Exemplo de Uso

```tsx
import { TimeSlotPicker } from '@/components';
import { TimeValue } from '@/types/scheduling';

export default function Page() {
    const [selectedTime, setSelectedTime] = useState<TimeValue>();

    return (
        <TimeSlotPicker
            value={selectedTime}
            onChange={setSelectedTime}
            step={30}
            startHour={8}
            endHour={21}
            unavailableSlots={["11:00", "13:00", "14:00"]}
        />
    );
}
```

## Responsividade

O componente usa grid responsivo:
```tsx
<div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
```

- **Mobile**: 3 colunas
- **Tablet (sm)**: 4 colunas
- **Desktop (md)**: 5 colunas

## Compatibilidade Dark/Light Mode

O componente suporta automaticamente o modo escuro através das classes Tailwind `dark:`:

```html
<button class="bg-gray-700 dark:bg-gray-800 ...">
```

O Tailwind alternará automaticamente quando a classe `dark` estiver presente no elemento pai (geralmente `<html>` ou `<body>`).

## Migração do TimeSelect

Para migrar de `TimeSelect` para `TimeSlotPicker`:

**Antes:**
```tsx
<TimeSelect
    value={selectedTime}
    onChange={setSelectedTime}
    step={30}
    startHour={8}
    endHour={18}
/>
```

**Depois:**
```tsx
<TimeSlotPicker
    value={selectedTime}
    onChange={setSelectedTime}
    step={30}
    startHour={8}
    endHour={21}
    unavailableSlots={["11:00", "13:00"]}
/>
```

As props principais são as mesmas, e agora você pode passar um array de slots indisponíveis!
