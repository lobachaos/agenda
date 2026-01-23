# Exemplos de Uso - TimeSlotPicker

## Uso Básico

```tsx
import { TimeSlotPicker } from '@/components';
import { TimeValue } from '@/types/scheduling';
import { useState } from 'react';

export default function BookingPage() {
    const [time, setTime] = useState<TimeValue>();

    return (
        <TimeSlotPicker
            value={time}
            onChange={setTime}
            step={30}
            startHour={8}
            endHour={21}
        />
    );
}
```

## Com Slots Indisponíveis

```tsx
<TimeSlotPicker
    value={selectedTime}
    onChange={setSelectedTime}
    step={30}
    startHour={8}
    endHour={21}
    unavailableSlots={["11:00", "13:00", "14:00", "16:00", "17:00"]}
/>
```

## Em um Formulário Completo

```tsx
'use client';

import { TimeSlotPicker, DateSelect } from '@/components';
import { TimeValue, DateValue } from '@/types/scheduling';
import { useState } from 'react';

export default function BookingForm() {
    const [date, setDate] = useState<DateValue>();
    const [time, setTime] = useState<TimeValue>();
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!date || !time) {
            alert('Selecione data e horário');
            return;
        }
        
        console.log({
            name,
            date: `${date.day}/${date.month}/${date.year}`,
            time: `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')}`
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-2">Nome</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
                    required
                />
            </div>

            <DateSelect
                value={date}
                onChange={setDate}
                daysAhead={30}
            />

            <TimeSlotPicker
                value={time}
                onChange={setTime}
                step={30}
                startHour={8}
                endHour={21}
                unavailableSlots={["11:00", "13:00"]}
            />

            <button
                type="submit"
                className="w-full px-4 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-300"
            >
                Confirmar Agendamento
            </button>
        </form>
    );
}
```

## Estilizando o Componente

O componente já vem com estilos padrão, mas você pode ajustar via CSS customizado:

```tsx
<div className="bg-white dark:bg-gray-900 p-6 rounded-lg">
    <TimeSlotPicker
        value={time}
        onChange={setTime}
        step={15}  // slots de 15 em 15 minutos
        startHour={9}
        endHour={17}
    />
</div>
```

## Gerando Slots Indisponíveis Dinamicamente

```tsx
import { TimeSlotPicker } from '@/components';
import { TimeValue } from '@/types/scheduling';
import { useState, useMemo } from 'react';

export default function DynamicAvailability() {
    const [time, setTime] = useState<TimeValue>();
    const [selectedDate, setSelectedDate] = useState<string>('');

    // Simular busca de slots indisponíveis no servidor
    const unavailable = useMemo(() => {
        if (!selectedDate) return [];
        
        // Exemplo: segundas tem slots limitados
        const date = new Date(selectedDate);
        if (date.getDay() === 1) {
            return ["10:00", "11:00", "14:00", "15:00"];
        }
        
        return ["12:00", "13:00"]; // Padrão: intervalo do almoço
    }, [selectedDate]);

    return (
        <TimeSlotPicker
            value={time}
            onChange={setTime}
            step={30}
            startHour={8}
            endHour={18}
            unavailableSlots={unavailable}
        />
    );
}
```

## Com Validação

```tsx
import { TimeSlotPicker } from '@/components';
import { TimeValue } from '@/types/scheduling';
import { useState } from 'react';

export default function ValidatedBooking() {
    const [time, setTime] = useState<TimeValue>();
    const [error, setError] = useState('');

    const handleTimeChange = (newTime: TimeValue) => {
        setTime(newTime);
        
        // Validar se o horário é válido
        if (newTime.hour < 8 || newTime.hour >= 18) {
            setError('Horário deve estar entre 08:00 e 18:00');
        } else {
            setError('');
        }
    };

    return (
        <div>
            <TimeSlotPicker
                value={time}
                onChange={handleTimeChange}
                step={30}
                startHour={8}
                endHour={18}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
}
```

## Tipos TypeScript para Referência

```typescript
import { TimeValue, DateValue, TimeSelectOption, TimePeriod, TimeSlotGroup } from '@/types/scheduling';

// TimeValue representa um horário
const appointment: TimeValue = {
    hour: 14,
    minute: 30  // 14:30
};

// Você pode formatar assim:
const formatted = `${String(appointment.hour).padStart(2, '0')}:${String(appointment.minute).padStart(2, '0')}`;
console.log(formatted); // "14:30"

// Ou usar a função utilitária:
import { formatSelectedValue } from '@/utils/time-select.utils';
console.log(formatSelectedValue(appointment)); // "14:30"
```

---

**Dica**: O componente gerencia automaticamente os estados visuais. Basta passar `value` para o horário selecionado e `unavailableSlots` com um array de labels indisponíveis!
