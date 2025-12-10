package org.back.backendd.Controller;

import org.back.backendd.model.Producto;
import org.back.backendd.Repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@CrossOrigin(origins = "*") // luego podemos limitar a localhost:5173 si quieres
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    // GET: listar todos
    @GetMapping
    public List<Producto> getAll() {
        return productoRepository.findAll();
    }

    // POST: crear nuevo
    @PostMapping
    public Producto create(@RequestBody Producto p) {
        return productoRepository.save(p);
    }

    // PUT: actualizar
    @PutMapping("/{id}")
    public Producto update(@PathVariable Long id, @RequestBody Producto p) {
        p.setId(id);
        return productoRepository.save(p);
    }

    // DELETE: eliminar
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        productoRepository.deleteById(id);
    }
}
