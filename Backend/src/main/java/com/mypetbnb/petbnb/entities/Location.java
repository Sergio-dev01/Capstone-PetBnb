package com.mypetbnb.petbnb.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String indirizzo;
    private String citta;
    private String descrizione;
    private double prezzoPerNotte;

    @ManyToOne
    @JoinColumn(name = "host_id", nullable = false)
    private User host;
    @OneToMany(mappedBy = "location")
    private List<Booking> bookings;

    public Location(String nome, String indirizzo, String citta, String descrizione, double prezzoPerNotte, User host) {
        this.nome = nome;
        this.indirizzo = indirizzo;
        this.citta = citta;
        this.descrizione = descrizione;
        this.prezzoPerNotte = prezzoPerNotte;
        this.host = host;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getIndirizzo() {
        return indirizzo;
    }

    public void setIndirizzo(String indirizzo) {
        this.indirizzo = indirizzo;
    }

    public String getCitta() {
        return citta;
    }

    public void setCitta(String citta) {
        this.citta = citta;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public double getPrezzoPerNotte() {
        return prezzoPerNotte;
    }

    public void setPrezzoPerNotte(double prezzoPerNotte) {
        this.prezzoPerNotte = prezzoPerNotte;
    }

    public Long getId() {
        return id;
    }

    public User getHost() {
        return host;
    }

    public void setHost(User host) {
        this.host = host;
    }

    @Override
    public String toString() {
        return "Location{" +
                "nome='" + nome + '\'' +
                ", indirizzo='" + indirizzo + '\'' +
                ", citta='" + citta + '\'' +
                ", descrizione='" + descrizione + '\'' +
                ", prezzoPerNotte=" + prezzoPerNotte +
                '}';
    }
}
