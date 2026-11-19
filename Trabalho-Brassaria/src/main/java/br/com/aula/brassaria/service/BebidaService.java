package br.com.aula.brassaria.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.com.aula.brassaria.dto.BebidaDto;
import br.com.aula.brassaria.model.BebidaModel;
import br.com.aula.brassaria.model.CategoriaModel;
import br.com.aula.brassaria.repository.BebidaRepository;
import br.com.aula.brassaria.repository.CategoriaRepository;

@Service
public class BebidaService {

    private final BebidaRepository bebidaRepository;
    private final CategoriaRepository categoriaRepository;

    public BebidaService(BebidaRepository bebidaRepository, CategoriaRepository categoriaRepository) {
        this.bebidaRepository = bebidaRepository;
        this.categoriaRepository = categoriaRepository;
    }

    public List<BebidaDto> listar() {
        return bebidaRepository.findAll().stream().map(this::paraDto).toList();
    }

    public BebidaDto buscarPorId(Long id) {
        return paraDto(buscarModel(id));
    }

    public BebidaDto salvar(BebidaDto dto) {
        BebidaModel model = new BebidaModel();
        preencher(model, dto);
        return paraDto(bebidaRepository.save(model));
    }

    public BebidaDto atualizar(Long id, BebidaDto dto) {
        BebidaModel model = buscarModel(id);
        preencher(model, dto);
        return paraDto(bebidaRepository.save(model));
    }

    public void deletar(Long id) {
        bebidaRepository.delete(buscarModel(id));
    }

    private void preencher(BebidaModel model, BebidaDto dto) {
        CategoriaModel categoria = categoriaRepository.findById(dto.categoriaId()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não encontrada"));
        model.setNome(dto.nome());
        model.setCategoria(categoria);
    }

    private BebidaModel buscarModel(Long id) {
        return bebidaRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Bebida não encontrada"));
    }

    private BebidaDto paraDto(BebidaModel model) {
        return new BebidaDto(model.getId(), model.getNome(),
                model.getCategoria().getId(), model.getCategoria().getNome());
    }
}