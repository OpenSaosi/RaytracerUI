
<template>
<v-container style="background:white">
    <v-layout text-center wrap>
        <!--<v-flex xs12>
            <v-img :src="require('../assets/newscreenshot1.png')" class="my-3" contain height="200"></v-img>
        </v-flex>

        <v-flex mb-4>
            <h1 class="display-2 font-weight-bold mb-3">
                Welcome to NonMQL Expert Advisor Studio
            </h1>
            <h3 class="font-weight-bold mb-3">
                Powered by Fintechee
            </h3>
            <p class="subheading font-weight-regular">
                For help and collaboration with other Fintechee developers,
                <br>please join our online
                <a href="https://twitter.com/Fintechee1" target="_blank">Fintechee Twitter Community</a>.
                <br>You can run Expert Advisor(EA) on our WEB Trader, a Forex trading platform
                <a href="https://wwww.fintechee.com/web-trader/" target="_blank">Fintechee(the best Forex trading platform)</a>.
                <br>Please refer to our tutorials to know more details
                <a href="https://wwww.fintechee.com/tutorial-for-forex-trading/" target="_blank">Fintechee Tutorials</a>.
                <br>Or check our SDK documents
                <a href="https://wwww.fintechee.com/sdk-trading/" target="_blank">Fintechee SDK</a>.
            </p>
        </v-flex>-->

        <v-flex mb-5 xs12>
            <h2 class="headline font-weight-bold mb-3">Generate your algo trading source code in ONE minute!!</h2>
            <a href="https://www.fintechee.com" target="_blank">Fintechee Trading Platform</a>

            <v-layout justify-center>
                <v-card class="ma-5" min-width="400">
                    <v-form class="pa-5" ref="form">
                        <v-text-field label="Broker(Optional, Default: Current Broker)" placeholder="Broker" v-model="broker" :rules="brokerRules"></v-text-field>
                        <v-text-field label="Account(Optional, Default: Current Account)" placeholder="Account" v-model="account" :rules="accountRules"></v-text-field>
                        <v-select
                          :items="instrumentNames"
                          label="Instrument"
                          v-model="instrument"
                          :rules="instrumentRules"
                        ></v-select>
                        <v-select
                          :items="timeFrames"
                          label="Time Frame"
                          v-model="timeFrame"
                          :rules="timeFrameRules"
                        ></v-select>
                        <v-select
                          :items="indicatorNames"
                          label="Indicator"
                          v-model="indicator"
                          :rules="indicatorRules"
                        ></v-select>
                        <v-select
                          :items="templates"
                          label="Template"
                          v-model="template"
                          :rules="templateRules"
                          @change="changeTemplate"
                        ></v-select>
                        <v-img
                          :src="featuredPic"
                          height="195"
                          v-if="featuredPic"
                          style="margin-bottom:10px"
                        ></v-img>

                        <v-btn text @click="clearForm()">Reset</v-btn>
                        <v-btn color="warning" dark @click="generateSourceCode()">Generate</v-btn>
                    </v-form>
                </v-card>
            </v-layout>

            <v-layout justify-center>
                <editor v-model="sourceCode" @init="editorInit" lang="javascript" theme="chrome" width="1000" height="1000"></editor>
            </v-layout>

            <!--<h2 class="headline font-weight-bold mb-3">To be Continued!!</h2>-->
        </v-flex>

    </v-layout>
</v-container>
</template>

<script>
export default {
    name: 'HelloWorld',

    data: () => ({
            broker: null,
            account: null,
            instrument: 'EUR/USD',
            timeFrame: 'TIME_FRAME.M1',
            indicator: 'sma',
            template: '1',
            featuredPic: '/images/template1.png',
            brokerRules: [
                v => typeof v == 'undefined' || v == null || v == '' || v.length <= 20 || 'Too many characters.(Limit: 20 characters)'
            ],
            accountRules: [
                v => typeof v == 'undefined' || v == null || v == '' || v.length <= 20 || 'Too many characters.(Limit: 20 characters)'
            ],
            instrumentRules: [
                v => v != '' || 'Instrument is required'
            ],
            timeFrameRules: [
                v => v != '' || 'Time Frame is required'
            ],
            indicatorRules: [
                v => v != '' || 'Indicator is required'
            ],
            templateRules: [
                v => v != '' || 'Template is required'
            ],

            sourceCode: '',

            instrumentNames: [{
                text: 'EUR/USD',
                value: 'EUR/USD'
            }, {
                text: 'GBP/USD',
                value: 'GBP/USD'
            }, {
                text: 'USD/JPY',
                value: 'USD/JPY'
            }],

            timeFrames: [{
                text: 'M1',
                value: 'TIME_FRAME.M1'
            }, {
                text: 'M5',
                value: 'TIME_FRAME.M5'
            }, {
                text: 'M15',
                value: 'TIME_FRAME.M15'
            }, {
                text: 'M30',
                value: 'TIME_FRAME.M30'
            }, {
                text: 'H1',
                value: 'TIME_FRAME.H1'
            }, {
                text: 'H4',
                value: 'TIME_FRAME.H4'
            }],

            indicatorNames: [{
                text: 'Simple Moving Average',
                value: 'sma'
            }, {
                text: 'Exponential Moving Average',
                value: 'ema'
            }, {
                text: 'Smoothed Moving Average',
                value: 'smma'
            }, {
                text: 'Linear weighted Moving Average',
                value: 'lwma'
            }, {
                text: 'Relative Strength Index',
                value: 'rsi'
            }, {
                text: 'MACD',
                value: 'macd'
            }, {
                text: 'Non-Indicator',
                value: 'nonindicator'
            }],
            indicatorMap: [],
            templates: [{
                text: 'Close Price vs Indicator',
                value: '1',
            }, {
                text: 'Indicator vs Constant Number',
                value: '2'
            }, {
                text: 'Main vs Signal',
                value: '3'
            }, {
                text: 'Candlesticks with the Same Color',
                value: '4'
            }],
            templateMap: [],
}),
