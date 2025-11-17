import express from "express";

function create_sever(name, port) {
  const app = express();
  const historic = [];

  app.get("/balance", async (req, res) => {
    const start_request = Date.now();

    const delay = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
    await new Promise(r => setTimeout(r, delay));

    const end_request = Date.now();
    const request_time = end_request - start_request;

    const registers = {
      ip: req.ip,
      timestamp: new Date().toISOString(),
      resp_time: request_time,
      server: name
    };

    historic.push(registers);

    res.setHeader("Content-Type", "text/html;charset=utf-8");
    res.send(`
      <html>
        <head>
          <title>${name}</title>
          <style>
            body { font-family: Arial; background: #fafafa; padding: 20px; }
            h1 { color: #333; }
            .item { background: #fff; padding: 10px; margin: 5px 0; border-radius: 8px; }
          </style>
        </head>
        <body>
          <h1>Servidor: ${name}</h1>
          <p>Delay simulado: <b>${delay}ms</b></p>
          <p>Tempo total: <b>${request_time}ms</b></p>
          <h2>Histórico (últimos 10)</h2>

          ${historic
            .slice(-10)
            .map(h => `
              <div class="item">
                <b>IP:</b> ${h.ip}<br>
                <b>Horário:</b> ${h.timestamp}<br>
                <b>Resposta:</b> ${h.resp_time}ms<br>
                <b>Servidor:</b> ${h.server}
              </div>
            `)
            .join("")}
        </body>
      </html>
    `);
  });

  app.listen(port, () => {
    console.log(`Servidor ${name} rodando na porta ${port}`);
  });
}


create_sever("servidor-A1", 3001);
create_sever("servidor-B1", 3002);
create_sever("servidor-C1", 3003);
