package br.com.aula.brassaria.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.com.aula.brassaria.dto.InstitucionalDto;

@Service
public class InstitucionalService {

    public InstitucionalDto obter() {
        return new InstitucionalDto(
                "Produzir bebidas de qualidade para momentos de encontro, incentivando o consumo consciente e o cuidado com a saúde de quem as aprecia.",
                "Ser reconhecida como a fabricante que une 780 anos de tradição à inovação, com opções para todos os estilos de vida, com e sem álcool.",
                List.of(
                        "Tradição que se renova",
                        "Consumo responsável",
                        "Cuidado com a saúde dos clientes",
                        "Qualidade em cada etapa da produção",
                        "Respeito às pessoas e ao meio ambiente"));
    }
}