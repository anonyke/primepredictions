export default function PaymentForm() {
  return (
    <form style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
      <label>
        Amount
        <input name="amount" type="number" min="1" placeholder="e.g. 1000" style={{ width: '100%', padding: 10, marginTop: 6 }} />
      </label>
      <button type="submit" style={{ padding: 12, background: '#111', color: 'white', border: 0, borderRadius: 8 }}>
        Pay
      </button>
    </form>
  );
}

