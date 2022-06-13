import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ListRepositoryComponent } from './list-repository.component'
import { RepositoryService } from '../../../services/repository.service'
import { Store } from '@ngrx/store'
import { RouterTestingModule } from '@angular/router/testing'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { of } from 'rxjs'
import { Router } from '@angular/router'
import { MOCK_REPOSITORIES } from '../../../mocks/mock-repository'

describe('ListRepositoryComponent', () => {
  let component: ListRepositoryComponent
  let fixture: ComponentFixture<ListRepositoryComponent>

  const router = {
    navigate: jasmine.createSpy('navigate')
  }

  const repositoryServiceSpy = jasmine.createSpyObj('RepositoryService', ['getRepository', 'getContributors'])
  const storeSpy = jasmine.createSpyObj<Store>('store', ['select', 'dispatch'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListRepositoryComponent],
      providers: [
        { provide: RepositoryService, useValue: repositoryServiceSpy },
        { provide: Store, useValue: storeSpy },
        { provide: Router, useValue: router }
      ],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRepositoryComponent)
    component = fixture.componentInstance
    component.pagination$ = of({ endCursor: 'endCursor', startCursor: 'startCursor' })
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('ngOnInit second time', () => {
    storeSpy.dispatch.calls.reset()
    component.pagination$ = of({ endCursor: 'endCursor', startCursor: 'startCursor' })
    fixture.detectChanges()
    storeSpy.dispatch.and.callFake(() => {})
    component.ngOnInit()
    expect(storeSpy.dispatch).toHaveBeenCalledTimes(0)
  })

  it('ngOnInit first time', () => {
    storeSpy.dispatch.calls.reset()
    component.pagination$ = of(null)
    fixture.detectChanges()
    storeSpy.dispatch.and.callFake(() => {})
    component.ngOnInit()
    expect(storeSpy.dispatch).toHaveBeenCalled()
  })

  it('navigateToDetails', () => {
    component.navigateToDetails(MOCK_REPOSITORIES[0])
    expect(router.navigate).toHaveBeenCalledWith(
      ['/repositories/2338'], Object({ queryParams: Object({ name: 'sprint', owner: 'bendc' }) })
    )
  })

  it('onTableScroll ', () => {
    storeSpy.dispatch.calls.reset()
    const event = {
      target: {
        offsetHeight: 100,
        scrollHeight: 200,
        scrollTop: 220
      }
    }
    component.onTableScroll(event, { endCursor: 'endCursor', startCursor: 'startCursor' })
    expect(storeSpy.dispatch).toHaveBeenCalled()
  })
})
