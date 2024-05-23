package com.insurance.www;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;

@SpringBootApplication
@OpenAPIDefinition(
	info = @Info(
		title = "Property Insurance REST API Documentation",
		description = "Total monolith REST API Documentation",
		version = "V2" ,
		contact = @Contact(
			name = " Ravi sir",
			email =" dummy@email.com"
		)

	)
)
public class PropertyInsuranceApplication {

	public static void main(String[] args) {
		SpringApplication.run(PropertyInsuranceApplication.class, args);
	}

}
