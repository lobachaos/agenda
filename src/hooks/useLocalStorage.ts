import { useState, useEffect } from 'react';
import { Appointment } from '@/types/scheduling';

const STORAGE_KEY = 'agendamentos_db';

export const useLocalStorage = (initialData: Appointment[]) => {
    const [data, setData] = useState<Appointment[]>(initialData);
    const [isLoaded, setIsLoaded] = useState(false);

    // Carregar dados do localStorage na primeira renderização
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setData(JSON.parse(stored));
            } else {
                // Se não existir, salvar dados iniciais
                localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
            }
        } catch (error) {
            console.error('Erro ao carregar do localStorage:', error);
            setData(initialData);
        }
        setIsLoaded(true);
    }, []);

    // Salvar dados sempre que mudarem
    const saveData = (newData: Appointment[]) => {
        try {
            setData(newData);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
        } catch (error) {
            console.error('Erro ao salvar no localStorage:', error);
        }
    };

    // Limpar localStorage
    const clearData = () => {
        try {
            localStorage.removeItem(STORAGE_KEY);
            setData(initialData);
        } catch (error) {
            console.error('Erro ao limpar localStorage:', error);
        }
    };

    return {
        data,
        saveData,
        clearData,
        isLoaded,
    };
};
