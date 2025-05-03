import { Injectable, NestMiddleware } from '@nestjs/common'; // Importa as dependências necessárias do NestJS para criar middlewares.
import { Request, Response, NextFunction } from 'express'; // Importa os tipos de Request, Response e NextFunction do Express, usados para manipulação da requisição HTTP.

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // O LoggerMiddleware é uma classe que implementa a interface NestMiddleware.

  use(req: Request, res: Response, next: NextFunction) {
    // O método 'use' é o coração do middleware. Ele é executado para cada requisição.
    // A função 'next' deve ser chamada para passar a requisição para o próximo middleware ou controlador.

    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    // Registra o método HTTP e a URL da requisição no formato de log com o timestamp da requisição.

    res.on('finish', () => {
      // O evento 'finish' é acio
      // nado quando a resposta é finalizada (após a requisição ser tratada).
      // Isso garante que o status da resposta seja registrado depois que a requisição for processada.

      console.log(
        `Middleware \nStatusCode: ${res.statusCode}, Message: ${res.statusMessage}`,
        // Registra o código de status e a mensagem associada à resposta.
      );
    });

    next(); // Passa a requisição para o próximo middleware ou controlador.
  }
}
