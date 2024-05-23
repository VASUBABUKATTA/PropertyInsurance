package com.insurance.www.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.insurance.www.model.FillDetails;

@Repository
public interface FillDetailsRepository extends JpaRepository<FillDetails , Long >
{

	List<FillDetails> findAll();

	List<FillDetails> findByCustomerId(String customerId);

	
	
}
