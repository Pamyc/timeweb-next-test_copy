"use client";

import { useState } from "react";
import { Bot, User, Edit3, ArrowRight, UserCheck, ImageIcon, FileText, CheckSquare, Clock, Upload, Search, PhoneIncoming, PhoneOutgoing, PhoneMissed, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

type CRMType =
  | "call_incoming"
  | "call_outgoing"
  | "call_missed"
  | "field_change"
  | "stage_change"
  | "responsible_change"
  | "whatsapp_image"
  | "note"
  | "task";

interface CRMEvent {
  id: number;
  type: CRMType;
  title: string;
  description: string;
  timestamp: Date;
  user: string;
  details?: {
    phone?: string;
    duration?: string;
    oldValue?: string;
    newValue?: string;
    field?: string;
    stage?: string;
    responsible?: string;
  };
}

export default function Home() {
  const [text, setText] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<CRMEvent | null>(null);
  const [addEventData, setAddEventData] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Привет! Я готов помочь вам с анализом событий сделки. Выберите промпт или напишите свой запрос.", isUser: false, timestamp: new Date() }
  ]);

  const prompts = ["Проанализируй активность по сделке", "Составь отчет по звонкам", "Покажи изменения в сделке"];

  const crmEvents: CRMEvent[] = [
    { id: 1, type: "call_outgoing", title: "Исходящий звонок", description: "ЦОЛ ЦОЛ заявка ... интересны цены акции", timestamp: new Date("2024-04-10T13:11:19"), user: "Центр обработки лидов", details: { phone: "79896193498", duration: "5 мин" } },
    { id: 2, type: "call_incoming", title: "Входящий звонок", description: "Звонок от клиента по поводу квартиры", timestamp: new Date("2024-04-10T12:30:00"), user: "Петров А.С.", details: { phone: "79896193498", duration: "3 мин" } },
    { id: 3, type: "call_missed", title: "Пропущенный звонок", description: "пропущенный звонок от 2024-04-10 19:06:35, перезвонить", timestamp: new Date("2024-04-10T19:06:35"), user: "Система", details: { phone: "79896193498" } },
    { id: 4, type: "task", title: "Задача/заметка", description: "Подготовить коммерческое предложение", timestamp: new Date("2024-04-10T10:00:00"), user: "Сидоров В.П." },
    { id: 5, type: "field_change", title: "Обновление поля «Регион обращения (полный)»", description: "«» → «Ростов-на-Дону»", timestamp: new Date("2024-04-10T09:30:00"), user: "Система", details: { field: "Регион обращения (полный)", oldValue: "", newValue: "Ростов-на-Дону" } }
  ];

  const getEventIcon = (type: CRMType) => {
    switch (type) {
      case "call_incoming": return <PhoneIncoming className="w-4 h-4" />;
      case "call_outgoing": return <PhoneOutgoing className="w-4 h-4" />;
      case "call_missed":  return <PhoneMissed className="w-4 h-4" />;
      case "field_change": return <Edit3 className="w-4 h-4" />;
      case "stage_change": return <ArrowRight className="w-4 h-4" />;
      case "responsible_change": return <UserCheck className="w-4 h-4" />;
      case "whatsapp_image": return <ImageIcon className="w-4 h-4" />;
      case "note":         return <FileText className="w-4 h-4" />;
      case "task":         return <CheckSquare className="w-4 h-4" />;
      default:             return <Clock className="w-4 h-4" />;
    }
  };

  const getEventColor = (type: CRMType) => {
    switch (type) {
      case "call_incoming": return "bg-green-500/10 text-green-600 border-green-500/20";
      case "call_outgoing": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "call_missed":   return "bg-red-500/10 text-red-600 border-red-500/20";
      case "field_change":  return "bg-orange-500/10 text-orange-600 border-orange-500/20";
      case "stage_change":  return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      case "responsible_change": return "bg-indigo-500/10 text-indigo-600 border-indigo-500/20";
      case "whatsapp_image":    return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "note":          return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "task":          return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      default:              return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  const filteredEvents = crmEvents.filter(e =>
    (e.title + " " + e.description).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSend = () => {
    if (!text.trim()) return;
    const userMessage: Message = { id: messages.length + 1, text: text.trim(), isUser: true, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setText("");

    setTimeout(() => {
      const aiMessage: Message = {
        id: userMessage.id + 1,
        text: `Анализирую события по сделке ${addEventData ? "(с учётом данных)" : ""}... Найдено ${filteredEvents.length} релевантных событий.${selectedEvent ? " Фокус: " + selectedEvent.title : ""}`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground">ID сделки</div>
            <div className="text-xl font-semibold">31032038</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Распознать изображения</div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Обработка... 3</span>
            </div>
            <div className="text-xs text-muted-foreground">Осталось: 3</div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 pb-4 flex items-center gap-3">
          <Button variant="outline"><Upload className="w-4 h-4 mr-2" />Загрузить аудио</Button>
          <Select className="w-32" defaultValue="all" options={[
            { value: "all", label: "Все типы" },
            { value: "call", label: "Звонки" },
            { value: "field", label: "Поля" },
            { value: "task", label: "Задачи" }
          ]} />
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9 w-64" placeholder="текст, телефон, автор, ID..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid md:grid-cols-[380px_1fr_320px] gap-4 p-4">
        {/* Левая колонка — события */}
        <aside className="border rounded-lg bg-card overflow-hidden">
          <div className="p-4 border-b font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5" /> События ({filteredEvents.length})
          </div>
          <div className="max-h-[70vh] overflow-y-auto">
            {filteredEvents.map((event, i) => (
              <div key={event.id}
                   className={`p-4 border-b cursor-pointer hover:bg-accent/50 ${selectedEvent?.id === event.id ? "bg-accent" : ""}`}
                   onClick={() => setSelectedEvent(event)}>
                <div className="flex items-start gap-3">
                  <div className="text-xs text-muted-foreground mt-1">{i + 1}</div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border flex-shrink-0 ${getEventColor(event.type)}`}>
                    {getEventIcon(event.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm mb-1">{event.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                    <div className="text-xs text-muted-foreground mt-1">
                      {event.timestamp.toLocaleDateString("ru-RU")} {event.timestamp.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Чат */}
        <section className="flex flex-col gap-3">
          <div className="overflow-y-auto space-y-3 max-h-[60vh]">
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.isUser ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-3 max-w-[80%] ${m.isUser ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`w-8 h-8 rounded-full grid place-items-center ${m.isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                    {m.isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <Card className={`${m.isUser ? "bg-primary text-primary-foreground" : "bg-card"}`}>
                    <p className="text-sm leading-relaxed">{m.text}</p>
                    <p className="text-[10px] opacity-70 mt-1">{m.timestamp.toLocaleTimeString()}</p>
                  </Card>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex gap-2 flex-wrap">
              {prompts.map((p, idx) => (
                <Button key={idx} variant="outline" size="sm" onClick={() => setText(p)}>Промпт {idx + 1}</Button>
              ))}
            </div>
            <div className="flex gap-2 items-end">
              <Textarea className="flex-1 min-h-[80px]" placeholder="привет" value={text} onChange={e => setText(e.target.value)} />
              <div className="flex flex-col gap-2">
                <Button onClick={handleSend} disabled={!text.trim()}>Отправить</Button>
                <Button variant="outline" onClick={() => setText("")}>Сбросить</Button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox checked={addEventData} onChange={e => setAddEventData(e.currentTarget.checked)} />
              <span className="text-sm text-muted-foreground">Добавить данные событий</span>
              <Badge variant="secondary" className="ml-auto">Demo UI</Badge>
            </div>
          </div>
        </section>

        {/* Детали события */}
        <aside className="border rounded-lg bg-card p-4">
          {selectedEvent ? (
            <>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Детали события</h3>
                <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(null)}>×</Button>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full grid place-items-center border ${getEventColor(selectedEvent.type)}`}>
                    {getEventIcon(selectedEvent.type)}
                  </div>
                  <span>{selectedEvent.title}</span>
                </div>
                <div><span className="text-muted-foreground">Автор:</span> {selectedEvent.user}</div>
                <div><span className="text-muted-foreground">Время:</span> {selectedEvent.timestamp.toLocaleString("ru-RU")}</div>
                <div className="p-2 bg-muted rounded">{selectedEvent.description}</div>
                <div className="pt-2 border-t flex justify-between">
                  <Button variant="ghost" size="sm"><ChevronLeft className="w-4 h-4" /> Предыдущее</Button>
                  <Button variant="ghost" size="sm">Следующее <ChevronRight className="w-4 h-4" /></Button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-muted-foreground text-sm">Выберите событие слева</div>
          )}
        </aside>
      </main>
    </div>
  );
}
