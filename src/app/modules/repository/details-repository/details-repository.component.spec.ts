import { ComponentFixture, TestBed } from '@angular/core/testing'

import { DetailsRepositoryComponent } from './details-repository.component'
import { RepositoryService } from '../../../services/repository.service'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'
import { Store } from '@ngrx/store'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterTestingModule } from '@angular/router/testing'

describe('DetailsRepositoryComponent', () => {
  let component: DetailsRepositoryComponent
  let fixture: ComponentFixture<DetailsRepositoryComponent>

  // eslint-disable-next-line no-undef
  const repositoryServiceSpy = jasmine.createSpyObj('RepositoryService', ['getRepository', 'getContributors'])
  // eslint-disable-next-line no-undef
  const storeSpy = jasmine.createSpyObj<Store>('store', ['select'])
  const activatedRoute = { queryParams: of({ rfidCardId: 1 }) }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsRepositoryComponent],
      providers: [
        { provide: RepositoryService, useValue: repositoryServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Store, useValue: storeSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes([])
      ]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsRepositoryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
