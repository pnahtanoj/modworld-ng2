import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';
import { AudioClockComponent } from './components/audio-clock/audio-clock.component';
import { SequencerStepComponent } from './components/sequencer/sequencer-step/sequencer-step.component';
import { SequencerTrackComponent } from './components/sequencer/sequencer-track/sequencer-track.component';

import { AudioApiService } from './services/audio-api.service';

@NgModule({
  declarations: [
    AppComponent,
    AudioClockComponent,
    SequencerStepComponent,
    SequencerTrackComponent
  ],
  imports: [
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ AudioApiService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
