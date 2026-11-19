package br.com.aula.brassaria.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.com.aula.brassaria.dto.CategoriaDto;
import br.com.aula.brassaria.model.CategoriaModel;
import br.com.aula.brassaria.repository.CategoriaRepository;

@Service
public class CategoriaService {
	
	private final CategoriaRepository repository;

    public CategoriaService(CategoriaRepository repository) {
        this.repository = repository;
    }

    public List<CategoriaDto> listar() {
        return repository.findAll().stream().map(this::paraDto).toList();
    }

    public CategoriaDto buscarPorId(Long id) {
        return paraDto(buscarModel(id));
    }

    public CategoriaDto salvar(CategoriaDto dto) {
        CategoriaModel model = new CategoriaModel();
        model.setNome(dto.nome());
        return paraDto(repository.save(model));
    }

    public CategoriaDto atualizar(Long id, CategoriaDto dto) {
        CategoriaModel model = buscarModel(id);
        model.setNome(dto.nome());
        return paraDto(repository.save(model));
    }

    public void deletar(Long id) {
        repository.delete(buscarModel(id));
    }

    private CategoriaModel buscarModel(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não encontrada"));
    }

    private CategoriaDto paraDto(CategoriaModel model) {
    	return new CategoriaDto(model.getId(), model.getNome());
    }

}
