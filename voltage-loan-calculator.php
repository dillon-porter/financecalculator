<?php
/**
 * Plugin Name: Voltage Loan Calculator
 * Description: A custom loan calculator for Voltage Powersports financing estimates.
 * Version: 1.0.2
 * Author: Dillon Porter
 */

if (!defined('ABSPATH')) {
    exit;
}

function voltage_loan_calculator_enqueue_assets() {
    wp_enqueue_style(
        'voltage-loan-calculator-style',
        plugin_dir_url(__FILE__) . 'assets/css/calculator.css',
        array(),
        '1.0.2'
    );

    wp_enqueue_script(
        'voltage-loan-calculator-script',
        plugin_dir_url(__FILE__) . 'assets/js/calculator.js',
        array(),
        '1.0.2',
        true
    );
}
add_action('wp_enqueue_scripts', 'voltage_loan_calculator_enqueue_assets');

function voltage_loan_calculator_shortcode() {
    ob_start();
    ?>
    <div class="voltage-loan-calculator">
        <div class="voltage-calculator-card">

            <div class="voltage-calculator-header">
                <h2>Voltage Powersports</h2>
                <p>Financing Estimate Calculator</p>
            </div>


            <div class="voltage-field">
                <label for="voltage-model">Choose a model</label>
                <select id="voltage-model">
                    <option value="7000.98">Sting MX5 - $7,000.98</option>
                    <option value="5999.99">Sting MX4 - $5,999.99</option>
                    <option value="7999">Komodo - $7,999.00</option>
                    <option value="4999.99">X3 Pro - $4,999.99</option>
                    <option value="18250">Stark Varg EX - $18,250.00</option>
                    <option value="17390.99">MX 1.2 Stark Varg - $17,390.99</option>
                </select>
            </div>

      <div class="voltage-info-box">
    <span class="voltage-info-icon">ⓘ</span>
    <span>
        Includes a <strong>$469 Assembly &amp; Destination Fee.</strong>
    </span>
</div>

            <div class="voltage-field">
                <label for="voltage-province">Province / Tax</label>
                <select id="voltage-province">
                    <option value="0.15">Newfoundland and Labrador - HST 15%</option>
                </select>
            </div>

            <div class="voltage-field">
                <label for="voltage-down-payment">Cash down payment</label>
                <input type="number" id="voltage-down-payment" placeholder="Example: 500" min="0">
                <small>Enter 0 if you are not making a down payment.</small>
            </div>

            <div class="voltage-field">
                <label for="voltage-term">
                    Financing term:
                    <strong><span id="voltage-term-value">36</span> months</strong>
                </label>
                <input type="range" id="voltage-term" min="12" max="72" step="12" value="36">
            </div>

            <div class="voltage-field">
                <label for="voltage-interest">
                    Annual interest rate:
                    <strong><span id="voltage-interest-value">10</span>%</strong>
                </label>
                <input type="range" id="voltage-interest" min="0" max="29.99" step="0.25" value="10">
            </div>

            <div class="voltage-field">
                <label>Payment frequency</label>

                <div class="voltage-radio-group">
                    <label>
                        <input type="radio" name="voltage-frequency" value="monthly" checked>
                        Monthly
                    </label>

                    <label>
                        <input type="radio" name="voltage-frequency" value="biweekly">
                        Bi-weekly
                    </label>

                    <label>
                        <input type="radio" name="voltage-frequency" value="weekly">
                        Weekly
                    </label>
                </div>
            </div>

            <button type="button" id="voltage-calculate">
                Calculate Estimated Payment
            </button>

            <div id="voltage-result" class="voltage-result" style="display:none;"></div>

            <p class="voltage-disclaimer">
                This is an estimate only. Final approval, rates, terms, taxes, and payments may vary.
            </p>

        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('voltage_loan_calculator', 'voltage_loan_calculator_shortcode');