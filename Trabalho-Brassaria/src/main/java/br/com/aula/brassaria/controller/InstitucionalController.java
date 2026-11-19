package br.com.aula.brassaria.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.aula.brassaria.dto.InstitucionalDto;
import br.com.aula.brassaria.service.InstitucionalService;

@RestController
@RequestMapping("/institucional")
public class InstitucionalController {

    private final InstitucionalService service;

    public InstitucionalController(InstitucionalService service) {
        this.service = service;
    }

    @GetMapping
    public InstitucionalDto obter() {
        return service.obter();
    }
}