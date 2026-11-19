package br.com.aula.brassaria.dto;

import java.time.LocalDate;

public record EventoDto(Long id, String titulo, String descricao, LocalDate dataEvento) {
}