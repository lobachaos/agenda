import React from "react";

export const EmptyState: React.FC = () => {
    return (
        <div className="text-center py-8">
            <p className="text-lg text-zinc-600 mb-2">
                Nenhum agendamento para esta data
            </p>
            <p className="text-sm text-zinc-500">
                Selecione outra data ou crie um novo agendamento
            </p>
        </div>
    );
};
