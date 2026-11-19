package br.com.aula.brassaria.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.aula.brassaria.dto.CategoriaDto;
import br.com.aula.brassaria.service.CategoriaService;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {
	private final CategoriaService service;

    public CategoriaController(CategoriaService service) {
        this.service = service;
    }

    @GetMapping
    public List<CategoriaDto> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public CategoriaDto buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CategoriaDto criar(@RequestBody CategoriaDto dto) {
        return service.salvar(dto);
    }

    @PutMapping("/{id}")
    public CategoriaDto atualizar(@PathVariable Long id, @RequestBody CategoriaDto dto) {
        return service.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }

}
