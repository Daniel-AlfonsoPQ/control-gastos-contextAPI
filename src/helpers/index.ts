export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
}

export function formatDate(date: string): string {
    return new Intl.DateTimeFormat('es-ES', {
        month: 'long',
        weekday: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(date));
}