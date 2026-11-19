package br.com.aula.brassaria.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.aula.brassaria.model.CategoriaModel;

public interface CategoriaRepository extends JpaRepository<CategoriaModel, Long> {
}