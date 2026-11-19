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

import br.com.aula.brassaria.dto.BebidaDto;
import br.com.aula.brassaria.service.BebidaService;

@RestController
@RequestMapping("/bebidas")
public class BebidaController {

    private final BebidaService service;

    public BebidaController(BebidaService service) {
        this.service = service;
    }

    @GetMapping
    public List<BebidaDto> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public BebidaDto buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BebidaDto criar(@RequestBody BebidaDto dto) {
        return service.salvar(dto);
    }

    @PutMapping("/{id}")
    public BebidaDto atualizar(@PathVariable Long id, @RequestBody BebidaDto dto) {
        return service.atualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletar(@PathVariable Long id) {
        service.deletar(id);
    }
}