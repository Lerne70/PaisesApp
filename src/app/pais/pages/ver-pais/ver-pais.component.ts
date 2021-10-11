import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pai.s.interface';

import { PaisService } from '../../services/pais.service';


@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  constructor(private activateRoute: ActivatedRoute,
    private paisService: PaisService) { }

  ngOnInit(): void {

    /**
     * Esta es una forma para poder susbrivirse dos Observables
     * donde uno depende de lo que obtenga el otro
     * el switchMap lo que hece es que regresa un observable pero no hay necesidad de susbrivirse
     */
    this.activateRoute.params
    .pipe(
      switchMap( ({ id }) => this.paisService.gerPaisPorAlpha(id) ),
      tap(console.log)
    )
    .subscribe(pais => {
      //console.log(pais);
      this.pais = pais;
    });

    // this.activateRoute.params
    // .subscribe( ({id}) => {
    //   console.log(id);

    //   this.paisService.gerPaisPorAlpha(id)
    //   .subscribe(pais => {
    //     console.log(pais);
    //   });
    // });

  }

}
