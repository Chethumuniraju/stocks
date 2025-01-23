package com.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.backend.service.StockService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Map;

@RestController
@RequestMapping("/api/stocks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class StockController {
    private final StockService stockService;
    private static final Logger log = LoggerFactory.getLogger(StockController.class);

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchStocks(@RequestParam String symbol) {
        try {
            log.info("Searching for symbol: {}", symbol);
            Map<String, Object> result = stockService.searchStocks(symbol);
            log.info("Search results: {}", result);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("Error searching stocks: ", e);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{symbol}/data")
    public ResponseEntity<Object> getStockData(
            @PathVariable String symbol,
            @RequestParam(defaultValue = "1h") String interval) {
        return ResponseEntity.ok(stockService.getStockData(symbol, interval));
    }

    @GetMapping("/{symbol}/quote")
    public ResponseEntity<Object> getQuote(@PathVariable String symbol) {
        return ResponseEntity.ok(stockService.getQuote(symbol));
    }
} 