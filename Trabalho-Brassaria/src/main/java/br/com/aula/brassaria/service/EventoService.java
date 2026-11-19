package br.com.aula.brassaria.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.com.aula.brassaria.dto.EventoDto;
import br.com.aula.brassaria.model.EventoModel;
import br.com.aula.brassaria.repository.EventoRepository;

@Service
public class EventoService {

    private final EventoRepository repository;

    public EventoService(EventoRepository repository) {
        this.repository = repository;
    }

    public List<EventoDto> listar() {
        return repository.findAll().stream().map(this::paraDto).toList();
    }

    public List<EventoDto> ultimos() {
        return repository.findTop3ByOrderByIdDesc().stream().map(this::paraDto).toList();
    }

    public EventoDto buscarPorId(Long id) {
        return paraDto(buscarModel(id));
    }

    public EventoDto salvar(EventoDto dto) {
        EventoModel model = new EventoModel();
        preencher(model, dto);
        return paraDto(repository.save(model));
    }

    public EventoDto atualizar(Long id, EventoDto dto) {
        EventoModel model = buscarModel(id);
        preencher(model, dto);
        return paraDto(repository.save(model));
    }

    public void deletar(Long id) {
        repository.delete(buscarModel(id));
    }

    private void preencher(EventoModel model, EventoDto dto) {
        model.setTitulo(dto.titulo());
        model.setDescricao(dto.descricao());
        model.setDataEvento(dto.dataEvento());
    }

    private EventoModel buscarModel(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Evento não encontrado"));
    }

    private EventoDto paraDto(EventoModel model) {
        return new EventoDto(model.getId(), model.getTitulo(), model.getDescricao(), model.getDataEvento());
    }
}