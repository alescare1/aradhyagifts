import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = JSON.parse(req.body);
    const orderId = data.orderId;
    const orderAmount = data.price;

     const appId = '706053c08ed274b9641deb3fd9350607';
     const secretKey = 'cfsk_ma_prod_fab829311323fb1837f8b3a83312e919_f637f27f';

    const response = await fetch('https://test.cashfree.com/api/v2/cftoken/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': APP_ID,
        'x-client-secret': SECRET_KEY
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: orderAmount,
        order_currency: 'INR',
        customer_details: {
          customer_email: data.email,
          customer_name: data.name,
          customer_phone: data.phone
        }
      })
    });

    const json = await response.json();
    res.status(200).json(json);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
