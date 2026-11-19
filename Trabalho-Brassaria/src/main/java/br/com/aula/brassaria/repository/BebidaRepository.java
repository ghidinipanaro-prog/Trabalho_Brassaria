package br.com.aula.brassaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.aula.brassaria.model.BebidaModel;

public interface BebidaRepository extends JpaRepository<BebidaModel, Long> {
}