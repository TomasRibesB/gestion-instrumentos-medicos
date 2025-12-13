'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Truck, RotateCcw } from 'lucide-react';
import styles from './CalendarView.module.css';

const EVENTS = [
  { id: 1, day: 5, title: 'Entrega: Sanatorio Central', type: 'delivery' },
  { id: 2, day: 8, title: 'Devolución: Hosp. Italiano', type: 'return' },
  { id: 3, day: 10, title: 'Entrega: Clínica del Valle', type: 'delivery' },
  { id: 4, day: 12, title: 'Entrega: Trauma Center', type: 'delivery' },
  { id: 5, day: 15, title: 'Devolución: Sanatorio Central', type: 'return' },
  { id: 6, day: 22, title: 'Entrega: IOMA La Plata', type: 'delivery' },
];

export default function CalendarView() {
  // Mocking December 2023 for visual purpose
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const startOffset = 5; // Friday 1st

  return (
    <div className="card" style={{ padding: 0 }}>
      {/* Calendar Header */}
      <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Diciembre 2023</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn" style={{ padding: '0.25rem' }}><ChevronLeft size={20} /></button>
          <button className="btn" style={{ padding: '0.25rem' }}><ChevronRight size={20} /></button>
          <button className="btn btn-primary">Hoy</button>
        </div>
      </div>

      {/* Days Header */}
      <div className={styles.gridHeader}>
        {['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'].map(day => (
          <div key={day} className={styles.dayHeader}>{day}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div className={styles.grid}>
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} className={styles.dayEmpty}></div>
        ))}
        
        {days.map(day => {
          const dayEvents = EVENTS.filter(e => e.day === day);
          return (
            <div key={day} className={styles.day}>
              <div className={styles.dayNumber}>{day}</div>
              <div className={styles.events}>
                {dayEvents.map(event => (
                  <div key={event.id} className={`${styles.event} ${event.type === 'delivery' ? styles.delivery : styles.returnItem}`}>
                    {event.type === 'delivery' ? <Truck size={12} /> : <RotateCcw size={12} />}
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.title}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
