$input = $(
    Add-Type -AssemblyName Microsoft.VisualBasic
    [Microsoft.VisualBasic.Interaction]::InputBox('Enter website starts with http:// or https://', 'Enter website address', 'https://marcinpolak.eu')
)

docker run --rm wappalyzer/cli $input