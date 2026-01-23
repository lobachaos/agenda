# Arquitetura do TimeSlotPicker

## Estrutura de Arquivos

```
src/
├── components/
│   ├── time-slot-picker.tsx      ⭐ NOVO - Componente Principal
│   ├── time-slot-button.tsx      ⭐ NOVO - Botão Individual
│   ├── time-select.tsx            (mantido para compatibilidade)
│   ├── time-select-option-item.tsx (mantido para compatibilidade)
│   ├── date-select.tsx
│   ├── button.tsx
│   └── index.ts                   (atualizado com novas exportações)
│
├── configs/
│   └── time-select.config.ts      (sem mudanças)
│
├── types/
│   └── scheduling.ts              ⭐ ATUALIZADO
│
├── utils/
│   └── time-select.utils.ts       ⭐ EXPANDIDO
│
└── app/
    └── page.tsx                   ⭐ ATUALIZADO (usando novo componente)
```

## Fluxo de Dados

```
Page Component
    ↓
TimeSlotPicker (Container)
    ├── onChange: (value: TimeValue) => void
    ├── value: TimeValue
    ├── unavailableSlots: string[]
    └── step, startHour, endHour
        ↓
    generateOptions()
        ↓ (array de opções)
    groupOptionsByPeriod()
        ↓ (agrupa por Manhã/Tarde/Noite)
    TimeSlotGroup[] 
        ↓
    renderiza cada período (Manhã, Tarde, Noite)
        ↓
    TimeSlotButton para cada slot
        ├── onClick → onChange
        ├── available (verifica unavailableSlots)
        ├── selected (compara com value)
        └── styling baseado em estados
```

## Componente TimeSlotPicker

```typescript
TimeSlotPicker
├── Props
│   ├── value?: TimeValue              // Horário selecionado
│   ├── onChange?: (value) => void     // Callback de mudança
│   ├── step?: number                  // Intervalo em minutos (30)
│   ├── startHour?: number             // Hora inicial (0)
│   ├── endHour?: number               // Hora final (24)
│   └── unavailableSlots?: string[]    // ["11:00", "13:00"]
│
└── Renderiza
    ├── <div> título "Horários"
    └── para cada período (morning, afternoon, evening):
        ├── <h3> nome do período
        └── <div grid>
            └── TimeSlotButton × N
```

## Componente TimeSlotButton

```typescript
TimeSlotButton
├── Props
│   ├── time: TimeValue               // { hour: 14, minute: 30 }
│   ├── label: string                 // "14:30"
│   ├── available?: boolean            // true/false
│   ├── selected?: boolean             // true/false
│   └── onClick?: (time) => void       // Handler
│
└── Estados CSS
    ├── Available (default)
    │   └── bg-gray-700 text-gray-100
    │       dark:bg-gray-800 dark:text-gray-200
    │
    ├── Unavailable
    │   └── + opacity-50 + cursor-not-allowed
    │
    └── Selected
        └── text-yellow-400 border-2 border-yellow-400
            dark:text-yellow-300 dark:border-yellow-300
```

## Tipos TypeScript

```
scheduling.ts
├── TimeValue
│   ├── hour: number (0-23)
│   └── minute: number (0-59)
│
├── TimeSelectOption (ATUALIZADO)
│   ├── value: TimeValue
│   ├── label: string ("14:30")
│   └── available?: boolean (NOVO)
│
├── TimePeriod (NOVO)
│   └── 'morning' | 'afternoon' | 'evening'
│
└── TimeSlotGroup (NOVO)
    ├── period: TimePeriod
    ├── label: string ("Manhã", "Tarde", "Noite")
    └── slots: TimeSelectOption[]
```

## Utilitários

```
time-select.utils.ts
├── formatTime(hour, minute)
│   └── "HH:MM"
│
├── generateOptions(step, startHour, endHour)
│   └── TimeSelectOption[]
│
├── findOptionByLabel(options, label)
│   └── TimeSelectOption | undefined
│
├── formatSelectedValue(value)
│   └── "HH:MM" string
│
├── getPeriod(hour) ⭐ NOVO
│   └── 'morning' | 'afternoon' | 'evening'
│
└── groupOptionsByPeriod(options) ⭐ NOVO
    └── TimeSlotGroup[]
```

## Grid Responsivo

```
TimeSlotPicker
└── div.grid
    ├── grid-cols-3        (mobile)
    ├── sm:grid-cols-4     (tablet)
    ├── md:grid-cols-5     (desktop)
    └── gap-2              (espaçamento)

Exemplo (startHour=8, endHour=21, step=30):
Manhã (8:00-11:30):    5 horários
Tarde (12:00-17:30):   12 horários
Noite (18:00-20:30):   6 horários
Total:                 23 botões
```

## Fluxo de Seleção

```
Usuário clica em botão
    ↓
TimeSlotButton.onClick()
    ↓
verifica: available === true?
    ├─ Sim: chama onChange(timeValue)
    └─ Não: nada acontece
        ↓
onChange callback
    ↓
Component pai atualiza state
    ↓
Componente re-renderiza
    ↓
selected === true para esse horário?
    ├─ Sim: aplica style amarelo com borda
    └─ Não: mantém style padrão
```

## Dark Mode

```
Tailwind Dark Mode Integration
├── Classes no componente:
│   └── className="... dark:..."
│
├── TimeSlotButton:
│   ├── bg-gray-700 dark:bg-gray-800
│   ├── text-gray-100 dark:text-gray-200
│   ├── Selecionado:
│   │   ├── text-yellow-400 dark:text-yellow-300
│   │   └── border-yellow-400 dark:border-yellow-300
│
└── Ativação automática quando:
    └── <html class="dark"> ou <html data-theme="dark">
        ou css @media (prefers-color-scheme: dark)
```

## Performance

- **useMemo** em TimeSlotPicker para:
  - generateOptions() - evita recálculos
  - groupOptionsByPeriod() - evita reagrupamentos
  
- **Renderização otimizada**:
  - Cada TimeSlotButton é independente
  - Apenas o selecionado re-renderiza com mudança visual

---

**Resumo**: Arquitetura limpa, separação de responsabilidades, totalmente tipada e pronta para produção!
