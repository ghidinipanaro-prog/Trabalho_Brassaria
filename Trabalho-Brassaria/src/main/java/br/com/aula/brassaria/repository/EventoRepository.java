package br.com.aula.brassaria.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.aula.brassaria.model.EventoModel;

public interface EventoRepository extends JpaRepository<EventoModel, Long> {

    List<EventoModel> findTop3ByOrderByIdDesc();
}