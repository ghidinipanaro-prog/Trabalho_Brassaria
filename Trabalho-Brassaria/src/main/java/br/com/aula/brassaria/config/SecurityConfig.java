package br.com.aula.brassaria.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Protege a área administrativa: o site público continua aberto a todos,
 * mas a página admin e qualquer cadastro/edição/exclusão exigem login de ADMIN.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filtros(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/admin.html", "/js/admin.js").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/eventos/**", "/bebidas/**", "/categorias/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/eventos/**", "/bebidas/**", "/categorias/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/eventos/**", "/bebidas/**", "/categorias/**").hasRole("ADMIN")
                .anyRequest().permitAll())
            .formLogin(form -> form
                .loginPage("/login.html")
                .loginProcessingUrl("/login")
                .defaultSuccessUrl("/admin.html", true)
                .failureUrl("/login.html?erro")
                .permitAll())
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/index.html"));
        return http.build();
    }

    @Bean
    public UserDetailsService usuarios(@Value("${brassaria.admin.usuario}") String usuario,
                                       @Value("${brassaria.admin.senha}") String senha) {
        UserDetails admin = User.withUsername(usuario)
                .password("{noop}" + senha)
                .roles("ADMIN")
                .build();
        return new InMemoryUserDetailsManager(admin);
    }
}
