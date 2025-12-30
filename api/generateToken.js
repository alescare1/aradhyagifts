export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = JSON.parse(req.body);

    const appId = '706053c08ed274b9641deb3fd9350607';
     const secretKey = 'cfsk_ma_prod_fab829311323fb1837f8b3a83312e919_f637f27f'; // Replace with your Cashfree Secret Key

    // Cashfree token request
    const cfResponse = await fetch('https://test.cashfree.com/api/v2/cftoken/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': APP_ID,
        'x-client-secret': SECRET_KEY
      },
      body: JSON.stringify({
        order_id: data.orderId,
        order_amount: data.price,
        order_currency: 'INR',
        customer_details: {
          customer_email: data.email,
          customer_name: data.name,
          customer_phone: data.phone
        }
      })
    });

    if (!cfResponse.ok) {
      const errText = await cfResponse.text();
      console.error('Cashfree API error:', errText);
      return res.status(500).json({ error: 'Cashfree API error', details: errText });
    }

    const json = await cfResponse.json();
    return res.status(200).json(json);

  } catch (err) {
    console.error('Function error:', err);
    return res.status(500).json({ error: err.message });
  }
}
