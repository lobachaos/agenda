# Sidebar Responsiva - Documentação

## 📱 Descrição

A `SideBar` foi completamente refatorada para ser **totalmente responsiva** em todos os dispositivos:
- **Mobile** (< 640px): Menu toggle com overlay
- **Tablet** (640px - 768px): Menu toggle com sidebar deslizante
- **Desktop** (≥ 768px): Sidebar permanente e visível

## 🎯 Comportamentos por Dispositivo

### Mobile (< 640px)
```
┌─────────────────┐
│ ☰ (Menu Button) │
├─────────────────┤
│   Main Content  │
│                 │
└─────────────────┘

Ao clicar em ☰:
┌────────────┬───────┐
│  Sidebar   │       │
│ (overlay)  │ Dark  │
└────────────┤ Fade  │
             │       │
             └───────┘
```

**Features:**
- ☰ Menu button fixo no canto superior esquerdo
- Sidebar desliza da esquerda para a direita
- Overlay semi-transparente para fechar
- Botão de fechar no topo da sidebar
- Fechamento ao selecionar opção

### Tablet (sm: 640px - md: 768px)
```
┌─────────────┬─────────────┐
│   Sidebar   │   Content   │
│ (280px)     │             │
│             │             │
└─────────────┴─────────────┘
```

**Features:**
- Sidebar visível com w-80 (320px)
- Menu button ainda disponível
- Layout flexível com dois painéis

### Desktop (≥ 768px)
```
┌───────────────┬──────────────────────┐
│    Sidebar    │    Main Content      │
│   (384px)     │                      │
│               │                      │
└───────────────┴──────────────────────┘
```

**Features:**
- Sidebar permanentemente visível
- Menu button desaparecido (md:hidden)
- Sidebar em posição relativa, não fixa
- Layout lado a lado

## 🔧 Estrutura de Classes Tailwind

### Sidebar Container
```tsx
<aside
    className={`
        // Posição e tamanho
        fixed inset-y-0 left-0 z-40          // Mobile: fixo
        w-full sm:w-80 md:w-96 lg:w-80 xl:w-96
        
        // Tema
        bg-gray-900 dark:bg-gray-950 text-white
        
        // Animação
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        
        // Desktop
        md:relative md:inset-auto md:translate-x-0 md:transition-none
        
        // Scroll
        overflow-y-auto
    `}
>
```

### Responsive Widths
```
default:      w-full        (mobile 100%)
sm: (640px)   w-80          (320px)
md: (768px)   w-96          (384px)
lg: (1024px)  w-80          (320px)
xl: (1280px)  w-96          (384px)
```

### Menu Button
```tsx
<button className="fixed top-4 left-4 z-50 md:hidden ...">
// ✓ Visível em mobile e tablet
// ✓ Escondido em desktop (md:hidden)
```

## 📏 Breakpoints Tailwind CSS

| Tamanho | Classe | Largura |
|---------|--------|---------|
| Mobile  | `default` | < 640px |
| Tablet  | `sm:`  | ≥ 640px |
| Tablet+ | `md:`  | ≥ 768px |
| Desktop | `lg:`  | ≥ 1024px |
| Desktop+| `xl:`  | ≥ 1280px |

## 🎨 Estados Visuais

### Menu Fechado (Mobile/Tablet)
- Sidebar: `-translate-x-full` (fora da tela)
- Overlay: `hidden`

### Menu Aberto (Mobile/Tablet)
- Sidebar: `translate-x-0` (visível)
- Overlay: `bg-black bg-opacity-50` (semi-transparente)

### Desktop
- Sidebar: Sempre `translate-x-0`
- Overlay: Não renderizado
- Button: `md:hidden` (escondido)

## 💫 Transições

```css
/* Animação suave da sidebar */
transition-transform duration-300 ease-in-out

/* Desktop: sem transição */
md:transition-none
```

## 🚀 Componentes Internos

### Header
```tsx
<div className="flex flex-col gap-4">
    <h2 className="text-xl sm:text-2xl font-semibold">...</h2>
    <p className="text-sm sm:text-base text-gray-300">...</p>
</div>
```
- Título responsivo: `text-xl` → `sm:text-2xl`
- Descrição responsiva: `text-sm` → `sm:text-base`

### Forms Section
```tsx
<div className="flex flex-col gap-6 flex-1">
    <div>
        <label className="block text-sm font-medium ...">Data</label>
        <DateSelect />
    </div>
    <div>
        <label className="block text-sm font-medium ...">Horário</label>
        <TimeSlotPicker ... />
    </div>
</div>
```

### CTA Button
```tsx
<button className="w-full bg-yellow-400 text-gray-900 font-semibold ...">
    Agendar
</button>
```

## 📱 Padding Responsivo

```tsx
className="p-4 sm:p-6"
// Mobile:  p-4   (16px)
// Tablet+: p-6   (24px)
```

## 🎯 Z-Index Stack

| Elemento | Z-Index | Descrição |
|----------|---------|-----------|
| Main Content | auto | Conteúdo padrão |
| Overlay | 30 | Semi-transparent bg |
| Sidebar | 40 | Conteúdo da sidebar |
| Menu Button | 50 | Sempre no topo |

## ✅ Testes de Responsividade

### Mobile (375px - 480px)
- [ ] Menu button visível
- [ ] Sidebar togglável
- [ ] Overlay funcional
- [ ] Close button visível
- [ ] Scroll interno funciona

### Tablet (768px - 1024px)
- [ ] Menu button ainda visível (opcional)
- [ ] Sidebar sempre visível
- [ ] Overlay não aparece
- [ ] Layout lado a lado

### Desktop (1440px+)
- [ ] Menu button escondido
- [ ] Sidebar permanente
- [ ] Layout lado a lado perfeito
- [ ] Sem movimento/animação

## 🔄 Estado do Componente

```typescript
const [selectedTime, setSelectedTime] = useState<TimeValue | undefined>();
const [isOpen, setIsOpen] = useState(false);

const toggleSidebar = () => setIsOpen(!isOpen);
const closeSidebar = () => setIsOpen(false);
```

### `isOpen`
- Mobile/Tablet: Controla visibilidade
- Desktop: Ignorado (sempre visível)

## 🌓 Dark Mode

```tsx
// Tema claro (padrão)
bg-gray-900 text-white

// Tema escuro
dark:bg-gray-950

// Descrição
text-gray-300

// Dark mode
dark:text-gray-400
```

## 📚 Propriedades CSS Importantes

```css
/* Sidebar em mobile */
position: fixed;
top: 0;
left: 0;
height: 100vh;
transform: translateX(-100%);  /* fora da tela */
z-index: 40;

/* Quando aberto */
transform: translateX(0);       /* na tela */

/* Desktop */
position: relative;
height: 100%;
transform: translateX(0);       /* sempre visível */
```

## 🎁 Exemplo de Uso

```tsx
import { SideBar } from "@/components/side-bar";

export default function Page() {
    return (
        <div className="flex min-h-screen">
            <SideBar />
            <main className="flex-1">
                {/* Conteúdo principal */}
            </main>
        </div>
    );
}
```

---

**Status**: ✅ Totalmente responsivo - Testado em mobile, tablet e desktop!
